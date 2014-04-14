Ember.Handlebars.registerBoundHelper('percentage', function(value, options) {
  if (_.isNaN(value)) return '--%';
  return numeral(value).format('0.00%');
});