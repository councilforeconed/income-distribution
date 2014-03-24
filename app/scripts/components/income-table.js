IncomeDistribution.IncomeTableComponent = Ember.Component.extend({
  
  classNames: ['panel', 'panel-default', 'income-panel'],

  totalIncome: 0,
  isHidden: true,

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

    adjustIncome: function () {
      var incomes = Array.prototype.slice.call(this.$('.income-amount'));

      var sum = incomes.map(function (income) {
        return parseInt($(income).val(), 10) || 0;
      }).reduce(function(previous, current) {
        return previous + current;
      }, 0);

      this.set('totalIncome', sum);
    }

  }

});