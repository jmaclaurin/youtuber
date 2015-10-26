var youtuber = angular.module('youtuber', ['ngRoute']);
youtuber.config(function($routeProvider){
	$routeProvider.when('/new', {
		controller: 'YoutubeLinksController',
		templateUrl: 'form.html',
		resolve: {
			data: function(){
				return null;
			}
		}
	}).when('/edit/:youtube_link_id', {
		controller: 'YoutubeLinksController',
		templateUrl: 'form.html',
		resolve: {
			data: function(youtubeLinksFactory, $route){
        		return youtubeLinksFactory.getYoutubeLink($route.current.params.youtube_link_id);
			}
		}
	}).when('/', {
		controller: 'YoutubeLinksController',
		templateUrl: 'list.html',
		resolve: {
			data: function(youtubeLinksFactory, $route){
        		return null;
			}
		}
	}).otherwise({redirectTo: '/'});
});

youtuber.factory('youtubeLinksFactory', ['$http', function($http){
	var factory = {};
	var urlBase = 'http://localhost:5000/';

	factory.getYoutubeLinks = function(){
		return $http.get(urlBase + 'youtube_links');
	};

	factory.getYoutubeLink = function(id){
		return $http.get(urlBase + 'youtube_links/' + id);
	};

	factory.saveYoutubeLink = function(youtubeLink){
		if(youtubeLink.id){
			return $http.put(urlBase + 'youtube_links/' + youtubeLink.id, youtubeLink)
		}else{
			return $http.post(urlBase + 'youtube_links', youtubeLink);
		}
	};

	factory.deleteYoutubeLink = function(id){
		return $http.delete(urlBase + 'youtube_links/' + id);
	};

	return factory;
}]);

youtuber.controller('YoutubeLinksController', ['$scope', '$routeParams', '$location', 'youtubeLinksFactory', 'data', function($scope, $routeParams, $location, youtubeLinksFactory, data){
	$scope.youtube_links;
	$scope.status;

	if(data){
		$scope.youtubeLink = data.data;
	}

	getYoutubeLinks();


    function getYoutubeLinks() {
        youtubeLinksFactory.getYoutubeLinks()
            .success(function(links){
                $scope.youtube_links = links;
            })
            .error(function(error){
                $scope.status = 'Unable to load youtube links data: ' + error.message;
            });
    };

    $scope.saveYoutubeLink = function(){
    	youtubeLinksFactory.saveYoutubeLink($scope.youtubeLink).success(function(){
    		$scope.status = 'Successfully saved youtube link';
    		$location.path('#/');
    	}).error(function(error){
    		$scope.status = 'Unable to save youtube link: ' + error.message; 
    	});
    };

    $scope.removeYoutubeLink = function(youtubeLinkId){
    	youtubeLinksFactory.deleteYoutubeLink(youtubeLinkId).success(function(){
    		$scope.status = 'Successfully removed youtube link';
    		$location.path('#/');
    	}).error(function(error){
    		$scope.status = 'Unable to delete youtube link: ' + error.message; 
    	});
    };
}]);