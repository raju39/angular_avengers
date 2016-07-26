var app = angular.module('avengers' , [ 'ui.router' , 'ui.router.state' , 'ngRoute' , 'ui.router.util' , 'ngSanitize'] );

//////////////////////////////////////////////////////////////////
app.run(function($rootScope, $location ){


firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    $rootScope.loggedInUser = {

    	name : user.displayName,
    	photo : user.photoURL
	};
	$rootScope.$apply();
  } else {
  	$rootScope.loggedInUser = false;
  	alert('Not logged in');
    console.log('failed user');
    $rootScope.$apply();
  }
});


$rootScope.logout=function(){
firebase.auth().signOut();
//redirect
alert('You\'ve been logged out');
};


/////////// like avenger 
$rootScope.avergerLike= function(avengerID){
   /*firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
  	var email= user.email,
     firebase.database().ref('avengers/'+$avengerID).once('value').then(function(data){
	
	if(data){
     //************ insert like **************/
     /*var likesData={Likefrom : $email,
          LikeTo	: $avengerID,
          status	:'1',
          };

     firebase.database().ref('likes').push(likesData).then(function(success){
      console.log(success);
      if(success){
      	alert('success');
      }else{
      	alert('Not liked');
      }




     });

	}
	
	
});


  }else{
  	alert('please login ');
  }


});*/
};


//////// like avenget end 
$rootScope.$on('$locationChangeSuccess', function(event, next, current) {

	firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    $rootScope.loggedInUser = {

    	name : user.displayName,
    	photo : user.photoURL
	};
  } else {
  	$rootScope.loggedInUser = false;
  	alert('Not logged in');
    console.log('failed user');
  }
});

});

});

////////////////////////////////////////////////////////////////////
app.config(function($stateProvider, $urlRouterProvider, $httpProvider , $routeProvider, $locationProvider ) {

var templateUrl = "./assets/templates/";


	$stateProvider.state('login', {
	        url: "/",
	        templateUrl: templateUrl+"login.html",
	        controller: 'loginController'
	    })

	.state('home', {
	        url: "/home",
	        templateUrl: templateUrl+"home.html",
	        controller: 'homeController'
	    })

	.state('profile', {
	        url: "/",
	        templateUrl: templateUrl+"profile.html",
	        //controller: 'homeController'
	    })

	.state('single', {
	        url: "/single/:id",
	        templateUrl: templateUrl+"single.html",
	        controller: 'singleController'
	    })
	.state('addvenger', {
	        url: "/addvenger",
	        templateUrl: templateUrl+"addvenger.html",
	        controller: 'addvengerController'
	    })
	.state('register', {
	        url: "/register",
	        templateUrl: templateUrl+"register.html",
	        controller: 'UserRegisterController'
	    })
	.state('avengerLikes', {
	        url: "/avengerLikes/:id",
	        templateUrl: templateUrl+"avengerLikes.html",
	        controller: 'AvengerLikesController'
	    })




	});