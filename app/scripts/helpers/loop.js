Ember.Handlebars.registerHelper('loop', function(count, options) {
  var out = "";
 
  while (count--) {
    out+= options.fn();
  }
 
  return out;
});