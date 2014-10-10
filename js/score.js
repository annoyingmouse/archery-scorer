/**
* Created by Dominic on 10/10/2014.
*/
var myFirebaseRef = new Firebase("https://<your-firebase>.firebaseio.com");
var total = 0;
var clicks = 0;
var scores = [];
var user;
$(function(){
	$(document).nodoubletapzoom();
	$(".hidden-unless-auth-failed").hide();
	myFirebaseRef.onAuth(function(authData) {
		if (authData) {
			user = authData;
			$(".hidden-when-authorised").hide();
			$(".hidden-unless-authorised").show();
			console.log("User ID: " + authData.uid + ", Provider: " + authData.provider);
		} else {
			user = null;
			$(".hidden-when-authorised").show();
			$(".hidden-unless-authorised").hide();
			console.log("User not logged on");
		}
	});
	$("#login_form").submit(function(e){
		e.preventDefault();
		myFirebaseRef.authWithPassword({
			email	: $("#username").val(),
			password : $("#password").val()
		}, function(error, authData) {
			if (error === null) {
				user = authData;
				console.log("User ID: " + authData.uid + ", Provider: " + authData.provider);
			} else {
				$(".hidden-unless-auth-failed").show();
				$("#password").removeAttr("required");
				alert("Error authenticating user.");
			}
		});
	});
	$("#password-reset").on("click", function(e){
		e.preventDefault();
		if($("#username").val()){
			myFirebaseRef.resetPassword({"email":$("#username").val()}, function(error) {
				if (error === null) {
					alert("Password reset email sent successfully");
				} else {
					alert("The specified user does not exist.");
				}
			});
		}else{
			$("#username").closest(".form-group").addClass("has-error");
		}
	});
	$("#logout").on("click", function(){
		myFirebaseRef.unauth();
		user = null;
		$(".hidden-when-authorised").show();
		$(".hidden-unless-authorised").hide();
		$(".hidden-unless-auth-failed").hide();
	});
	$(".num").on("click", function(){
		var $this = $(this);
		if($this.hasClass("score")){
			clicks++;
			var score = parseInt($(this).data("num"), 10);
			total += score;
			scores.push(score);
			$("#roundTotal").text(total);
			if(clicks === 6){
				var scoreListRef = new Firebase('https://<your-firebase>.firebaseio.com/scores/'+user.uid);
				scoreListRef.push({
					"when": moment().format("DD/MM/YYYY HH:mm"),
					"score": scores
				});
				$(".num").removeClass("score");
			}
		}
	});
	$("#btnClr").on("click", function(){
		total = 0;
		clicks = 0;
		scores = [];
		$("#roundTotal").text("0");
		$(".num").addClass("score");
	});
});
(function($) {
	$.fn.nodoubletapzoom = function() {
		$(this).bind('touchstart', function preventZoom(e) {
			var t2 = e.timeStamp, 
			t1 = $(this).data('lastTouch') || t2, 
			dt = t2 - t1, 
			fingers = e.originalEvent.touches.length;
			$(this).data('lastTouch', t2);
			if (!dt || dt > 500 || fingers > 1) return;
			e.preventDefault();
			$(this).trigger('click').trigger('click');
		});
	};
})(jQuery);