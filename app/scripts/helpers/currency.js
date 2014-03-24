Ember.Handlebars.registerBoundHelper('currency', function(value, options) {
  return numeral(value).format('$0,0');
});