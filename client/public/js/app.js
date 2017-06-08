(function(global){

  global.ElmarLib = function(){}
  var orderIdInc = 0;


  ElmarLib.addProductAndLineItemToOrder = addProductAndLineItemToOrder;

  ElmarLib.getNewOrder = getNewOrder;

  function getNewOrder() {
    var ret = {
      id: orderIdInc,
      LineItems: [],
      SubTotal: 0,
      Taxes: 0,
      Total: 0
    }

    orderIdInc ++
    return ret;
  }

  function getNewLineItem() {
    return {
      CreatedDate: new Date(),
      Product: undefined,
      Quantity: 0,
      SubTotal: 0,
      Taxes: 0,
      Total: 0
    }
  }


  function addProductAndLineItemToOrder(Order, Product) {
    var Quantity = Quantity || 1;

    if(typeof Quantity !== 'number')
    {
      Quantity = parseInt(Quantity) || 1
    }

    var LineItemToAddTo;

    for(var i = 0; i < Order.LineItems.length; i++)
    {
      if(Order.LineItems[i].Product.id == Product.id)
      {
        LineItemToAddTo = Order.LineItems[i]
      }
    }
    //creates new line item
    if(!LineItemToAddTo) {
      LineItemToAddTo =  getNewLineItem();
      LineItemToAddTo.Product = Product;
      LineItemToAddTo.SubTotal = (Product.price * Quantity);
      LineItemToAddTo.Taxes = (Product.taxRate * LineItemToAddTo.SubTotal);
      LineItemToAddTo.Total = (LineItemToAddTo.SubTotal + LineItemToAddTo.Taxes);

      Order.LineItems.push(LineItemToAddTo);
    }

    LineItemToAddTo. Quantity += Quantity;

    Order.SubTotal += LineItemToAddTo.SubTotal;
    Order.Taxes += LineItemToAddTo.Taxes;
    Order.Total += LineItemToAddTo.Total;






  }


})(window)



angular.module('App', []);

angular.module('App', [
  'ProductService'
])



  .controller('AppCtrl', function($scope, $log,  $location, Product) {

    $scope.Order = ElmarLib.getNewOrder();

    Product.find().$promise.then(function(Products) {
      console.log(Products);
      $scope.Products = Products;
    });

    $scope.addItem = function(Order, product) {

      var toAdd ={
        Order: Order,

      }

      ElmarLib.addProductAndLineItemToOrder(Order, product)
      }

  });
