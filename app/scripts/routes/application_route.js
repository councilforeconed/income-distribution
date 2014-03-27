IncomeDistribution.ApplicationRoute = Ember.Route.extend({
  model: function () {
    var income = IncomeDistribution.IncomeTable;
    return [income.create()];
  }
});
