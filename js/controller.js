/* Controller */
var ngcControllers = angular.module('ngcControllers', [])

.controller('mainCtrl', function($rootScope, $scope, $timeout, $http, dataSvc) {
    $scope.appData;
    $http.get('data/appData.json').
    success(function(data) {
        $scope.appData = data;
    });

    // toggle menu
    $scope.toggleMenu = function() {
        if ($rootScope.isSbMenu) {
            $rootScope.isSbMenu = false;
        } else {
            $rootScope.isSbMenu = true;
        }
    }
    $scope.ret = function() {
        return;
    }

    // notifications
    $rootScope.notifications = [];
    if ($rootScope.notifications.length <= 0) {
        var promise = dataSvc.query('data/notifications.json');
        promise.then(function(data) {
            $rootScope.notifications = data.notifications;
        })
    }

    /* calling iframe yt player */
    $scope.callPlayer = function(frame_id, func, args) {
        if (window.jQuery && frame_id instanceof jQuery) frame_id = frame_id.get(0).id;
        var iframe = document.getElementById(frame_id);
        if (iframe && iframe.tagName.toUpperCase() != 'IFRAME') {
            iframe = iframe.getElementsByTagName('iframe')[0];
        }
        if (iframe) {
            // Frame exists, 
            iframe.contentWindow.postMessage(JSON.stringify({
                "event": "command",
                "func": func,
                "args": args || [],
                "id": frame_id
            }), "*");
        }
    }


})


// explore controller
.controller('exploreCtrl', function($scope, $rootScope, $timeout, dataSvc) {
    $scope.products = [];
    var promise = dataSvc.query('data/explore.json');
    promise.then(function(data) {
        $scope.data = data;
    });

    // show/hide exhibit desc
    $scope.toggleDesc = function(exhibit) {
        if (exhibit.open) {
            exhibit.open = false;
        } else {
            exhibit.open = true;
        }
    }

})

/* exhibitDetailCtrl */
.controller('exhibitDetailCtrl', function($scope, dataSvc, $routeParams) {
    var id = $routeParams.id;
    if (id) {
        id = id.replace(':', '');
    }
    $scope.exhibit = {};
    var promise = dataSvc.query('data/exhibitDetail-' + id + '.json');
    promise.then(function(data) {
        $scope.exhibit = data;
        $scope.$broadcast('dataLoaded');
    })



    $scope.afterSlide = function() {
        $('.ytEmbed').each(function() {
            var id = $(this).attr('id');
            $scope.callPlayer(id, 'pauseVideo');
        })
    }
})

/* feedback controller */
.controller('fbkCtrl', function($scope, dataSvc) {
    $scope.fbk = {};
    var promise = dataSvc.query('data/feedback.json');
    promise.then(function(data) {
        $scope.fbk = data;
    })
})

/* notification controller */
.controller('notiFnCtrl', function($scope, $rootScope, dataSvc) {

    return;

})

/* exhibitAlert Controller*/
.controller('exhibitAlertCtrl', function($scope, $rootScope, dataSvc, $routeParams) {
    var id = $routeParams.id;
    if (id) {
        id = id.replace(':', '');
    }
    $scope.exhibit = {};
    var promise = dataSvc.query('data/exhibitAlert-' + id + '.json');
    promise.then(function(data) {
        $scope.exhibit = data;
        $scope.$broadcast('dataLoaded');
    })


    // pause video after slide
    $scope.afterSlide = function() {
        $('.ytEmbed').each(function() {
            var id = $(this).attr('id');
            $scope.callPlayer(id, 'pauseVideo');
        })
    }

    //make notifn as viewed
    for (var i = 0; i < $scope.notifications.length; i++) {
        var nf = $scope.notifications[i];
        if (nf.id === id) {
            nf.isViewed = true;
        }
    }


})






/* directive controllers */
/* menu controller */
.controller('menuCtrl', function($scope, $rootScope, $timeout, dataSvc) {
    $scope.products = [];
    var promise = dataSvc.query('data/menu.json');
    promise.then(function(data) {
        $scope.menu = data.menu;
    });

    // toggle child menu stat
    $scope.toggleChild = function(lnk) {
        if (lnk.childOpen) {
            lnk.childOpen = false;
        } else {
            lnk.childOpen = true;
        }
    }
})
