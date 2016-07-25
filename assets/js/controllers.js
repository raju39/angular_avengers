app.controller('homeController' , function($scope , $stateParams){


firebase.database().ref('avengers').once('value').then(function(data){
	console.log(data.val());
	var _data = [];
	for(i in data.val()){
		var dat = data.val()[i];
		dat.id = i;	
		_data.push(dat);
	}
	$scope.avengers= _data;
	$scope.$apply();
});

	
});


app.controller('singleController' , function($scope , $stateParams){


firebase.database().ref('avengers/'+$stateParams.id).once('value').then(function(data){
	console.log(data.val());
	$scope.avenger = data.val();
	$scope.animateit = 'animated bounce infinite';
	$scope.$apply();
});

});


app.controller('loginController' , function($scope , $state){

$scope.facebook=function(){
	//User wants to login via Facebook
	var provider = new firebase.auth.FacebookAuthProvider();

	firebase.auth().signInWithPopup(provider).then(function(result) {
	// This gives you a Facebook Access Token. You can use it to access the Facebook API.
	var token = result.credential.accessToken;
	// The signed-in user info.
	var user = result.user;
	console.log('success');
	//redirect to home
	$state.go('home');
	console.log(user);
	}).catch(function(error) {
	// Handle Errors here.
	var errorCode = error.code;
	var errorMessage = error.message;
	alert('Error! ' + errorMessage);
	console.log(error);
	});


}

});


app.controller('addvengerController' , function($scope , $state){

//handle form submission
$scope.submit = function(){
	var avenger = {name :  $scope.name,
	image :  $scope.image,
	description :  $scope.description,
	real_name :  $scope.real_name,
	height :  $scope.height,
	weight :  $scope.weight,
	power :  $scope.power,
	ability :  $scope.ability
	};
	//insert the data 

	firebase.database().ref('avengers').push(avenger).then(function(success){
		console.log(success);
		
		if(success){
			console.log(success);
			document.forms[0].reset();
			alert('Data was pushed');
		}else{
			console.log(success);
			alert('Failed to push the data');
		}



	});

	return false;
};


});