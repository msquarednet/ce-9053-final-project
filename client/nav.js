angular.module("myWorld")
    .controller("NavCtrl", function($scope, NavSvc, AuthSvc){
      $scope.tabs = NavSvc.tabs;
      $scope.user = AuthSvc.user;
      $scope.logout = function(){
        AuthSvc.logout();
      };
    })
    .directive("myWorldNav", function(){
      return {
        restrict: "E",
        templateUrl: "/templates/nav.html",
        controller: "NavCtrl",
        scope: {
          showLoginButton: '@',
          fooBar: '@'
        }
      };
    })
    .factory("NavSvc", function($location){
      var _tabs = [
        {title: "Home",path: "/"},
        {title: "People",path: "/people"},
        {title: "Things",path: "/things"}
      ];
      return {
        tabs: _tabs,
        setTab: function(title){
          _tabs.forEach(function(tab){
            if(tab.title == title) 
              tab.active = true;
            else
              tab.active = false;
          });
        },
        path: $location.path(), //seem like this is only set (once) when singleton is created, and will get that value. :P
        updateTabs: function () {
          _tabs.forEach(function(t){
            var urlpath = $location.path();
            var tabpath = t.path
            //console.log(urlpath+" :: "+tabpath);
            //console.log(urlpath.indexOf(tabpath)+" :: "+urlpath.indexOf(t.label.toLowerCase()))
            //if ($location.path().indexOf(t.path)!=-1) {t.active=1}
            if ($location.path()===t.path) {t.active=1} 
            else {t.active=0;}
          });
          //console.log(_tabs);
        },
        go: function(path) {
          $location.path(path);
        }
      };
    });