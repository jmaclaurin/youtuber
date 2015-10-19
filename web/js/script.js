var youtuber = angular.module('youtuber', ['ngRoute']);

youtuber.config(function($routeProvider){
	$routeProvider.when('/new', {
		controller: 'YoutubeLinksController',
		templateUrl: 'new.html'
	}).when('/', {
		controller: 'YoutubeLinksController',
		templateUrl: 'list.html'
	}).otherwise({redirectTo: '/'});
});

youtuber.factory('youtubeLinksFactory', ['$http', function($http){
	var factory = {}
	var urlBase = 'http://localhost:5000/'

	factory.getYoutubeLinks = function(){
		return $http.get(urlBase + 'youtube_links');
	};

	factory.getYoutubeLink = function(id){

	};

	factory.insertYoutubeLink = function(){

	};

	return factory;
}]);

youtuber.controller('YoutubeLinksController', ['$scope', 'youtubeLinksFactory', function($scope, youtubeLinksFactory){
	$scope.youtube_links;
	$scope.status;

	getYoutubeLinks();

    function getYoutubeLinks() {
        youtubeLinksFactory.getYoutubeLinks()
            .success(function(links){
                $scope.youtube_links = links;
                console.log($scope.youtube_links);
            })
            .error(function(error){
                $scope.status = 'Unable to load youtube links data: ' + error.message;
            });
    };

    $scope.getYoutubeLink = function(id){

    };

    $scope.insertYoutubeLink = function(){

    };
}]);