/*
* =========================================================================
* Copyright 2017 T-Mobile USA, Inc.
* 
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =========================================================================
*/

'use strict';

(function(app) {
    app.directive( 'tiles', function() {
        return {
            restrict: 'E',
            templateUrl: 'app/Common/Directives/tiles/tiles.html',
            scope: {
                data: '=',                             // Input data
                img: '=',                              // Name of the image to be used as tile (no need of url)
                tileFuncAvailable: '=',                // Set to True if function is available to handle click on tile
                numOfTiles: '=?',   
                loading: '=',
                searchValue: '=',                      // Filter string
                tileDetails : '&',     
                deleteFolder : '&',    
                editFolder : '&',                      // Function to handle click on tile
                parent : '@'
            },
            link: function( scope, element, attrs ) {
              // console.log(scope);
                scope.imgSource = 'assets/images/' + scope.img;
                scope.tileClicked = function(e, item) {
                    if(scope.tileFuncAvailable) {
                        scope.tileDetails()(item);
                    }
                    e.stopPropagation();
                }
            }
        }
    } );
})(angular.module('pacman.directives.tiles',[]))
