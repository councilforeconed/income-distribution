IncomeDistribution.IncomeTable = Ember.Object.extend({
  data: [],
  sum: function () {
    var data = this.get('data');
    if (!data.length) return 0;
    return data.reduce(function (previous, current) {
      return previous + current;
    }, 0);
  }.property('data')
});