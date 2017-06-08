/**
 * Created by Elmarksi on 6/1/2017.
 */

module.exports = function(Order) {
  Order.AddLineItem = function(Order, Product) {
    var Quantity = Quantity || 1;
    var LineItemToAddTo;
  };

  Order.remoteMethod(
  'AddLineItem',
  {
    accepts: [
      {arg: 'Order', type: 'object'},
      {arg: 'Product', type: 'object', required: true},
    ],
    returns: {arg: 'Order', type: 'object'}
  }
);
};
