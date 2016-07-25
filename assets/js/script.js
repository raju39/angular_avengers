
$(function(){
$(window).on('resize' , function(){
var size = parseInt( $(window).height() ) ;
$('#fb-wrapper').css('height' , size+'px');
$('#fb-wrapper').css('visibility' , 'visible');
});

setTimeout(function(){
var size = parseInt( $(window).height() ) ;
$('#fb-wrapper').css('height' , size+'px');
$('#fb-wrapper').css('visibility' , 'visible');
},1000);



});