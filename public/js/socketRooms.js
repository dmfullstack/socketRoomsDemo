var socketRooms = angular.module('socketRooms', ['ui.bootstrap', 'ngRoute']);

socketRooms.config(['$routeProvider', function($routeProvider) {
	$routeProvider.
	when('/room/:roomName', {
		templateUrl: '/partials/room.html',
		controller: 'roomController'
	}).
	otherwise({
		redirectTo: '/'
	});
}]);

socketRooms.controller('roomController', ['$scope', '$http', '$routeParams',
	function($scope, $http, $routeParams) {
		$scope.socket;
		$scope.roomName = $routeParams.roomName;
		$scope.roomMessage = "";
		$scope.pubMessages = [];

		$scope.init = function() {
			//establish a socket connection
			$scope.socket = io();

			//inform server about which room have been joined by the member
			$scope.socket.emit('join:room', {
				'room': $scope.roomName
			});

			//register a event to receive message from server
			$scope.socket.on('room:message', function(data) {
				console.log('recieved messagef rom ', data.room, ' message: ', data.message);
				$scope.pubMessages.push(data.message);
				$scope.now = new Date();
				$scope.$apply();
			});

		};

		$scope.sendRoomMessage = function() {
			console.log('sending room message ', $scope.roomMessage, ' from room: ', $scope.roomName);

			var data = {
				'room': $scope.roomName,
				'message': $scope.roomMessage
			};

			$http.post('/room/message', data).
			success(function(data, status) {
				console.log('send message successfully');
				$scope.roomMessage = "";
			}).
			error(function(data, status) {
				console.log("error occurred..!");
			});
		};
	}
]);


/*socketRooms.factory('socketService', ['$rootScope', function($rootScope) {
	var socket = io.connect();

	return {
		on: function(eventName, callback) {
			socket.on(eventName, function() {
				var args = arguments;
				$rootScope.$apply(function() {
					callback.apply(socket, args);
				});
			});
		},
		emit: function(eventName, data, callback) {
			socket.emit(eventName, data, function() {
				var args = arguments;
				$rootScope.$apply(function() {
					if (callback) {
						callback.apply(socket, args);
					}
				});
			})
		}
	};
}]);*/
