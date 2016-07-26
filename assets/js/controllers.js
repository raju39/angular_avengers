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


var id = $stateParams.id;
firebase.database().ref('avengers/'+$stateParams.id).once('value').then(function(data){
	//console.log(data.val());
	$scope.avenger = data.val();
	$scope.animateit = 'animated bounce infinite';
	$scope.avengerID=  id;
	
    //$scope.$apply();
    //
    firebase.auth().onAuthStateChanged(function(user) {
 	if (user) {
    var email= user.email;

    firebase.database().ref('likes/').once('value').then(function(_data){
	for(i in _data.val()){
	   var avenger = _data.val()[i];
	   if( String(avenger.LikeTo) === String(id) && String(avenger.Likefrom) === String(email) && String(avenger.status) === "1"){
	    //  console.log('helo');
	     $scope.message= 'Dislike';
	     
	      break;
	    }else{
         $scope.message= 'Like';
	     

	    }
	  }
	  $scope.$apply();
	  });
	}else{
       $scope.$apply();

	}
   

   });



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

//user register controller

app.controller('UserRegisterController' , function($scope , $state){
	
	$scope.submit= function(){
     
     var users={ first_name	:  $scope.first_name,
     	last_name : $scope.last_name,
     	email : $scope.email,
     	password : $scope.password
        }; 


     
     firebase.database().ref('users').push(users).then(function(success){
     	console.log(success);
     	if(success){
     		console.log(success);
     		document.forms[0].reset();
     		alert('User data post');
     	}else{
     		console.log(success);
     		alert('User Failed to register');
     	}

     });
     return false;

	}
});

//////////////////////////// likes ////////////////////////////

app.controller('AvengerLikesController',function($scope ,  $stateParams){
 
 var ID= $stateParams.id;
 
 firebase.auth().onAuthStateChanged(function(user) {
 	if (user) {
    var email= user.email;
    var name=user.displayName;
    var pic=user.photoURL;
    
    
  
  	
     firebase.database().ref('avengers/'+$stateParams.id).once('value').then(function(data){
	
	if(data){
      //************ insert like **************//
     var likesData={userId : email,
          user : '{ name	:  '+name+' ,  pic	: ' +pic+',}'
          };

     firebase.database().ref('likes/'+ID).push(likesData).then(function(success){
      console.log(success);
      if(success){
      	alert('Liked');
      }else{
      	alert('Not liked');
      }
      });
	}
	

	});

     
}else{
  	alert('please login ');

   }
   });


});