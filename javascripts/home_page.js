$(document).ready(function(){

	Parse.initialize("wS5FBQCauFezsFutdFGGMrZMgEs3XADKfTvULhMb", "jy5VORCXKwEErZvFUHMKIsvD55YEYtfYLZIpc0JD");
	$("#general_alert").hide();
	$("#password_alert").hide();
	$("#email_alert").hide();
	$(document).on('click', "#register_button", function(){
		var re = /\w+/;
		var first_name = $("#first_name").val();

		if (re.exec(first_name) == null){
			$("#general_alert").show();
			return;
		}

		var last_name = $("#last_name").val();
		if (re.exec(last_name) == null){
			$("#general_alert").show();
			return;
		}
		
		var email = $("#email").val();
		if (re.exec(email) == null){
			$("#general_alert").show();
			return;
		}

		var password = $("#password").val();
		if (re.exec(password) == null){
			$("#general_alert").show();
			return;
		}

		var confirmed_password = $("#confirmed_password").val();
		if (re.exec(confirmed_password) == null){
			$("#general_alert").show();
			return;
		}

		var reEmail = /\w+@\w+\.\w+/;
		if (reEmail.exec(email) == null){
			$("#email_alert").show();
			return;
		}

		if (password != confirmed_password){
			console.log("PASSWORD: " + password);
			console.log("CONFIRMED: " + confirmed_password);
			$("#password_alert").show();
			return
		}

		var user = new Parse.User();
		user.set("username", email);
		user.set("password", password);
		user.set("email", email);
		user.set("first_name", first_name);
		user.set("last_name", last_name);

		user.signUp(null, {
			success: function(user) {
			// Hooray! Let them use the app now.
			window.location = "./profile_page.html";
			},
			error: function(user, error) {
			// Show the error message somewhere and let the user try again.
			alert("error");
			
			}
		});
	});


	$(document).on("click", "#login_button", function(){
		var username = $("#email_login").val();
		var password = $("#password_login").val();
		Parse.User.logIn(username, password, {
			success: function(user) {
			// Do stuff after successful login.
			window.location = "./profile_page.html";
			},
			error: function(user, error) {
			// The login failed. Check error to see why.
			alert("Failed to login");
			}
		});
	});
});