angular.module("myWorld")
  .controller("ThingsCtrl", ["$scope", "NavSvc", "$routeParams", "$location", "ThingsCRUDSvc", function ($scope, NavSvc, $routeParams, $location, ThingsCRUDSvc) {
  console.log("ThingsController")
  NavSvc.setTab("Things");
  //NavSvc.updateTabs();
  $scope.NavSvc = NavSvc;
  $scope.message = "I am the things control";
  
  $scope.editnew = ($routeParams._id) ? "Update" : "Insert";
  
  $scope.thethings= [];
  $scope.thething = {_id:$routeParams._id, name:"", color:"", desc:""};

  $scope.selectAll = function() {
    ThingsCRUDSvc.selectAllThings().then(function(things) {
      $scope.thethings = things;  //console.log("Thing SELECT ALL probably happened.")
    })
  };
  $scope.select = function() {
    ThingsCRUDSvc.selectThing($scope.thething).then(function(thing) {
      $scope.thething = thing;    //console.log("Thing SELECT probably happened.")
    })
  };
  $scope.insert = function() {
    ThingsCRUDSvc.insertThing($scope.thething).then(function(thing) {
      NavSvc.go("/things");      //console.log("Thing INSERT probably happened.")
    })
  };
  $scope.update = function() {
    ThingsCRUDSvc.updateThing($scope.thething).then(function(thing) {
      NavSvc.go("/things");      //console.log("Thing UPDATE probably happened.")
    })
  };
  $scope.delete = function() {
    ThingsCRUDSvc.deleteThing($scope.thething).then(function(thing) {
      NavSvc.go("/things");      console.log("Thing DELETE probably happened.")
    })
  };
  
  if ($routeParams._id) {
    $scope.select();
  } else {
    if ($location.path()==="/things") { $scope.selectAll() }
  // if (NavSvc.path==="/things") { $scope.selectAll() }  //hmmm, not work 'sometimes'
  }
  
}])
//SERVICES
.factory("ThingsCRUDSvc", function($http, $q) {
  return {
    selectAllThings: function() {
      var dfd = $q.defer();
      $http.get("/api/things").then(
        function(result) {dfd.resolve(result.data)}, 
        function(result) {dfd.reject (result.data.error)}
      );
      return dfd.promise;
    },
    selectThing: function(thing) {
      var dfd = $q.defer();
      $http.get("/api/things/"+thing._id).then(
        function(result) {dfd.resolve(result.data)}, 
        function(result) {dfd.reject (result.data.error)}
      );
      return dfd.promise;
    },    
    insertThing: function(thing) {
      var dfd = $q.defer();
      $http.post("/api/things", thing).then(
        function(result) {dfd.resolve(result.data)}, 
        function(result) {dfd.reject (result.data.error)}
      );
      return dfd.promise;
    },
    updateThing: function(thing) {
      var dfd = $q.defer();
      $http.put("/api/things/"+thing._id, thing).then(
        function(result) {dfd.resolve(result.data)}, 
        function(result) {dfd.reject (result.data.error)}
      );
      return dfd.promise;
    },    
    deleteThing: function(thing) {
      var dfd = $q.defer();
      $http.delete("/api/things/"+thing._id, thing).then(
        function(result) {dfd.resolve(result.data);console.log("yay")}, 
        function(result) {dfd.reject (result.data.error);console.log(result.data)}
      );  
      return dfd.promise;
    }
  }//return
});