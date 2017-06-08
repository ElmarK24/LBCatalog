'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');
var product = require('../common/models/product').product;
var app = module.exports = loopback();
var db = loopback.createDataSource({
  connector: loopback.Memory,
});

app.use(loopback.rest());
app.model(product);

product.attachTo(db);

product.create([
  {name: 'Orange', price: 1},
  {name: 'Apple', price: 1},
  {name: 'Banana', price: 1},
]);


app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
