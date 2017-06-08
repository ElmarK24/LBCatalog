/**
 * Created by Elmarksi on 6/8/2017.
 */
'user strict'
angular.module('LBCatalog')
  .controller('MainCtrl'), function MainCtrl($scope, $routeParams, Order, LineItem, $location) {

  $scope.LineItems = [];

  $scope.addLineItem = function () {
    LineItem
  }

};
