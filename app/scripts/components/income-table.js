IncomeDistribution.IncomeTableComponent = Ember.Component.extend({
  
  classNames: ['panel', 'panel-default', 'income-panel'],

  rows: 5,
  isHidden: true,

  totalIncome: function () {
    var data = this.get('data');
    if (!data.length) return 0;
    return data.reduce(function (previous, current) {
      return previous + current;
    }, 0);
  }.property('data'),

  changeRows: function () {
    var rows = this.get('rows');
    this.$('.income-table-row').slice(0, rows).show();
    this.$('.income-table-row').slice(rows).hide();
  }.observes('rows'),

  isMaxedOut: function () {
    return this.get('rows') >= 7;
  }.property('rows'),

  isBottomedOut: function () {
    return this.get('rows') <= 1;
   }.property('rows'),

   willInsertElement: function() {
    this.changeRows();
   },

  actions: {

    incrementRows: function () {
      this.incrementProperty('rows');
    },

    decrementRows: function () {
      this.decrementProperty('rows');
    },

    showTable: function () {
      this.set('isHidden', false);
    },

    hideTable: function () {
      this.set('isHidden', true);
    },
    
    clearTable: function () {
      this.$('.income-amount').val('');
      this.set('totalIncome', 0);
    },

    adjustIncome: function () {
      var data = this.$('.income-amount').map(function (index, income) {
        var $income = $(income);
        if ($income.val()) {
          return parseInt($(income).val(), 10) || 0;
        }
      });
      
      // Turn the data back in to a native JavaScript array.
      data = Array.prototype.slice.call(data);
      
      this.set('data', data);
    }
  }

});