/* JS for angular app */

var app = angular.module('app', ['ngRoute', 'ngSanitize', 'ngTouch', 'slick', 'ngcControllers', 'ngcDirectives', 'ngcServices'])

.config(['$routeProvider', '$compileProvider', function($routeProvide, $compileProvider) {
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|javascript):/);

    $routeProvide
        .when("/", {
            templateUrl: "partials/welcome.html"
        })
        .when("/welcome", {
            templateUrl: "partials/welcome.html"
        })
        .when("/explore", {
            templateUrl: "partials/explore.html",
            controller: 'exploreCtrl'
        })
        .when("/exhibitDetail", {
            redirectTo: '/exhibitDetail:101'
        })
        .when("/exhibitDetail:id", {
            templateUrl: "partials/exhibitDetail.html",
            controller: 'exhibitDetailCtrl'
        })
        .when("/home", {
            templateUrl: "partials/home.html",
            controller: "homeCtrl"
        })
        .when("/feedback", {
            templateUrl: "partials/feedback.html",
            controller: "fbkCtrl"
        })
        .when("/notifications", {
            templateUrl: "partials/notifications.html",
            controller: "notiFnCtrl"
        })
        .when("/exhibitAlert", {
            redirectTo: '/exhibitAlert:101'
        })
        .when("/exhibitAlert:id", {
            templateUrl: "partials/exhibitAlert.html",
            controller: "exhibitAlertCtrl"
        })



    .otherwise({
        redirectTo: '/'
    });
}])


//global event handler  
.run(function($rootScope, $window, $location, $timeout) {

    $rootScope.go = function(path) {
        $rootScope.app;
        if (path === 'back') { // Allow a 'back' keyword to go to previous page
            $window.history.back();
        } else { // Go to the specified path
            $location.path(path);
        };

    };

    $rootScope.$on('$routeChangeSuccess', function(ev, data, path) {
        var path = $location.path();
        $rootScope.pageClass = data.pageClass;
        if (typeof($rootScope.animPageClass) !== 'undefined') {
            $rootScope.pageClass = $rootScope.pageClass + ' ' + $rootScope.animPageClass;
        }
        $rootScope.isSbMenu = false;
    });
})
