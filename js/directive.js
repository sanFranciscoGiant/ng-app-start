var ngcDirectives = angular.module("ngcDirectives", [])
    /* sidebarMenu */
    .directive('sidebarMenu', function($timeout) {
        return {
            restrict: 'A',
            templateUrl: 'partials/directive/menu.html',
            controller: 'menuCtrl'
        }
    })
/* youtube video embedding */
.directive('videoEmbed', function($timeout) {
    return {
        restrict: 'A',
        template: '<iframe  class="ytEmbed" type="text/html" allowscriptaccess="always" width="100%" height="242"  data-allowfullscreen="true" data-frameborder="0" ></iframe><div class="vidMask top"></div><div class="vidMask"></div>',
        scope: {
            src: '@',
            vid: '@'
        },
        link: function(scope, el, attrs) {
             $('.ytEmbed', el).attr({'src': 'http://' +scope.src + '?enablejsapi=1', 'id':scope.vid});
            window.setTimeout(function() {
                $('.vidMask', el).on('mouseup', function() {
                   var id = $('.ytEmbed',el).attr('id');
                   callPlayer(id,'playVideo');
                })
            }, 10);


            /* calling iframe yt player */
            function callPlayer(frame_id, func, args) {
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
        }
    }
})

 //Only Number
 .directive('numbersOnly', function() {
     return {
         restrict: 'A',
         require: 'ngModel',
         link: function(scope, element, attrs, modelCtrl) {
             modelCtrl.$parsers.push(function(inputValue) {
                 if (inputValue === undefined) return ''
                 var transformedInput = inputValue.replace(/[^0-9.]/g, '');
                 if (transformedInput != inputValue) {
                     modelCtrl.$setViewValue(transformedInput);
                     modelCtrl.$render();
                 }
                 return transformedInput;
             });
         }
     };
 })


 // custome select
 .directive('customSelect', function() {
     return {
         restrict: 'A',

         template: '<a class="val" data-ng-click="openList()">{{selectedVal.name || "Select"}}</a><ul class="optionList"> \
         <li data-ng-repeat="item in list track by $index"><a class="option" data-ng-click="selectItem($index)">{{item.name}}</a></li> \
         </ul>',
         scope: {
             'list': '=',
             'val': '=ngModel',
             'shape': '='
         },
         link: function(scope, el, attrs) {
             // method to select item
             scope.selectItem = function(idx) {
                 scope.selectedVal = scope.list[idx];
                 scope.val = scope.list[idx].value;
                 $('.selEl.open').removeClass('open');
             };
             angular.element('body').on('click', function() {
                 $('.selEl.open').removeClass('open');
             })

             // method to open list 
             $('.val', el).on('click', function(e) {
                 e.stopPropagation();
                 if ($(el).hasClass('open')) {
                     $('.selEl.open').removeClass('open');
                 } else {
                     $('.selEl.open').removeClass('open');
                     $(el).addClass('open');
                 }
             })
         }
     }
 })

 // ie9 placeholder fix
.directive('iePlaceholder', function() {
    return {
        restrict: 'A',
        link: function(scope, el, attrs) {
            var isIE = navigator.userAgent.indexOf('MSIE 9') > -1;
            if (isIE) {
                function init(obj) {
                    obj.removeClass('placeholder');
                    if ($.trim(obj.val()) === "") {
                        obj.val(obj.attr('placeholder'));
                        obj.addClass('placeholder');
                    }
                }

                init($(el));

                $(el).on('focus', function() {
                    var me = $(this);
                    me.removeClass('placeholder');
                    if (me.val() === me.attr('placeholder')) {
                        me.val('');
                    }
                });

                $(el).on('blur', function() {
                    var me = $(this);
                    init(me);
                });
            }
        }
    };
})
