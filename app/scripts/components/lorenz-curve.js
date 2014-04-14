IncomeDistribution.LorenzCurveComponent = Ember.Component.extend({
  
  classNames: ['text-right', 'lorenz-curve-chart'],
  
  height: 350,
  margin: 50,
  
  lorenzifiedData: function () {
    var data = this.get('data');
    
    data = data.sort(function (a,b) {
  	  return d3.ascending(a, b);
    });

    var quintiles = Array.apply(null, new Array(5)).map(function () { return []; });
    var scale = d3.scale.quantize().domain([0, data.length]).range(d3.range(0,5));
    data.forEach(function (datum, index) {
      quintiles[scale(index)].push(datum);
    });

    var lorenzifiedData = quintiles.map(function (quintile) {
      return d3.sum(quintile);
    }).map(function (quintile) {
      return quintile / d3.sum(data);
    }).map(function (quintile, index, data) {
      return quintile + d3.sum(data.slice(0, index));
     });
     
     // Prepend the data to account for 0% of the population.
     lorenzifiedData.unshift(0);
     
     return lorenzifiedData;
     
  }.property('data'),
  
  updateChart: function () {
    
    var id = this.$().attr('id');
    var data = this.get('lorenzifiedData');
    
    // If the data doesn't is free of NaNs, update the graph.
    if (!_.some(data, _.isNaN)) {
      this.get('path')
        .datum(data)
        .transition()
          .duration(750)
          .ease("linear")
        .attr('d', this.get('line'));
    } else {
      this.get('path')
        .datum([0,0,0,0,0,0])
        .transition()
          .duration(750)
          .ease("linear")
        .attr('d', this.get('line'));
    }
    
         
  }.observes('lorenzifiedData'),
  
  didInsertElement: function () {
    
    var width = this.$().parent().get(0).offsetWidth;
    var height = this.get('height');
    var margin = this.get('margin');
    
    var id = this.$().attr('id');
    
    var dataset = this.get('lorenzifiedData');

    var svg = d3.select('#'+id)
      .append('svg')
      .attr({
        width: width,
        height: height
      });

    var xScale = d3.scale.ordinal()
      .domain(d3.range(6))
      .rangeBands([0, width - (margin * 2)], 1, 0);

    var yScale = d3.scale.linear()
      .range([height - (margin * 2), 0]);

    var line = d3.svg.line()
      .x(function(d,i) { return xScale(i); })
      .y(function(d,i) { return yScale(d); });

    // Set up a line of perfect equity
    svg.append('path')
      .datum(d3.range(0,1.2,0.2))
      .attr('class', 'line-of-perfect-equity')
      .attr('d', line)
      .attr('transform', 'translate(' + margin + ',' + margin + ')');

    var path = svg.append('path')
      .datum([0,0,0,0,0,0])
      .attr('class', 'lorenz-line')
      .attr('d', line)
      .attr('transform', 'translate(' + margin + ',' + margin + ')')
      .on('dblclick', function () {
        this.parentNode.removeChild(this);
      });

    var yAxis = d3.svg.axis()
      .scale(yScale)
      .orient('left')
      .ticks(6)
      .tickFormat(function(d) { return d * 100 + '%'; });

    svg.append('g')
      .attr('class', 'axis')
      .attr('transform', 'translate(' + (margin * 0.9) + ',' + margin + ')')
      .call(yAxis);

    var xAxis = d3.svg.axis()
      .scale(xScale)
      .orient('bottom')
      .ticks(6)
      .tickFormat(function(d) { return d * 20 + '%'; });

    svg.append('g')
      .attr('class', 'axis')
      .attr('transform', 'translate(' + margin + ',' + (height - margin * 0.9) + ')')
      .call(xAxis);
      
    this.set('svg', svg);
    this.set('path', path);
    this.set('line', line);
  },
  
  actions: {
    
    'addPath': function () {
      var margin = this.get('margin');
      
      var path = this.get('svg').append('path')
        .datum([0,0,0,0,0,0])
        .attr('class', 'lorenz-line')
        .attr('d', this.get('line'))
        .attr('transform', 'translate(' + margin + ',' + margin + ')')
        .on('dblclick', function () {
          this.parentNode.removeChild(this);
        });
      this.set('path', path);
    }
    
  }

});