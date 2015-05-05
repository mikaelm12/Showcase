$(document).ready(function(){

	Parse.initialize("wS5FBQCauFezsFutdFGGMrZMgEs3XADKfTvULhMb", "jy5VORCXKwEErZvFUHMKIsvD55YEYtfYLZIpc0JD");
	$(document).on('click', "#register_button", function(){
		var re = /\w+/;
		var first_name = $("#first_name").val();

		if (re.exec(first_name) == null){
			alert("Please enter your first name!");
			return;
		}

		var last_name = $("#last_name").val();
		if (re.exec(last_name) == null){
			alert("Please enter your last name!");
			return;
		}
		
		var email = $("#email").val();
		if (re.exec(email) == null){
			alert("Please enter your email address!");
			return;
		}


		var reEmail = /\w+@\w+\.\w+/;
		if (reEmail.exec(email) == null){
			alert("Please a valid email address");
			return;
		}

		var password = $("#password").val();
		if (re.exec(password) == null){
			alert("Please enter a password!");
			return;
		}

		var confirmed_password = $("#confirmed_password").val();
		if (re.exec(confirmed_password) == null){
			alert("Please confirm your password!");
			return;
		}

		if (password != confirmed_password){
			
			alert("The passwords do not match!");
			return
		}

		var user = new Parse.User();
		user.set("username", email);
		user.set("password", password);
		user.set("email", email);
		user.set("first_name", first_name);
		user.set("last_name", last_name);
		user.set("full_name",first_name + " " + last_name);
		user.set("bio","");

		user.signUp(null, {
			success: function(user) {
			// Hooray! Let them use the app now.
			localStorage.setItem('currentUser', JSON.stringify(user));
			window.location = "./profile_page.html";
			},
			error: function(user, error) {
			// Show the error message somewhere and let the user try again.
			console.log(user);
			alert("Could not create new account "  + error);
			
			}
		});
	});


	$(document).on("click", "#login_button", function(){
		var username = $("#email_login").val();
		var password = $("#password_login").val();
		Parse.User.logIn(username, password, {
			success: function(user) {
			// Do stuff after successful login.
			localStorage.setItem('currentUser', JSON.stringify(user));
			window.location = "./profile_page.html";
			},
			error: function(user, error) {
			// The login failed. Check error to see why.

			alert("Failed to login");
			}
		});
	});

	$("#password_login").keyup(function(event){
		if(event.keyCode == 13){
			var username = $("#email_login").val();
			var password = $("#password_login").val();
			Parse.User.logIn(username, password, {
				success: function(user) {
				// Do stuff after successful login.
				localStorage.setItem('currentUser', JSON.stringify(user));
				window.location = "./profile_page.html";
				},
				error: function(user, error) {
				// The login failed. Check error to see why.
				alert("Failed to login");
				}
			});
		}
	});

	$("#email_login").keyup(function(event){
		if(event.keyCode == 13){
			var username = $("#email_login").val();
			var password = $("#password_login").val();
			Parse.User.logIn(username, password, {
				success: function(user) {
				// Do stuff after successful login.
				localStorage.setItem('currentUser', JSON.stringify(user));
				window.location = "./profile_page.html";
				},
				error: function(user, error) {
				// The login failed. Check error to see why.
				alert("Failed to login");
				}
			});
		}
	});

	$("#confirmed_password").keyup(function(event){
		if(event.keyCode == 13){
			var re = /\w+/;
		var first_name = $("#first_name").val();

		if (re.exec(first_name) == null){
			alert("Please enter your first name!");
			return;
		}

		var last_name = $("#last_name").val();
		if (re.exec(last_name) == null){
			alert("Please enter your last name!");
			return;
		}
		
		var email = $("#email").val();
		if (re.exec(email) == null){
			alert("Please enter your email address!");
			return;
		}

		var reEmail = /\w+@\w+\.\w+/;
		if (reEmail.exec(email) == null){
			alert("Please a valid email address");
			return;
		}


		var password = $("#password").val();
		if (re.exec(password) == null){
			alert("Please enter a password!");
			return;
		}

		var confirmed_password = $("#confirmed_password").val();
		if (re.exec(confirmed_password) == null){
			alert("Please confirm your password!");
			return;
		}
		
		if (password != confirmed_password){
			
			alert("The passwords do not match!");
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
			localStorage.setItem('currentUser', JSON.stringify(user));
			window.location = "./profile_page.html";
			},
			error: function(user, error) {
			// Show the error message somewhere and let the user try again.
			alert("error");
			
			}
		});
		}
	});
});

findMatchingUsers = function(prefix){
	var query = new Parse.Query(Parse.User);
	
	query.find({
	success: function(users) {
    	console.log(users);
    	var userFullNames = []
    	for (var i = users.length - 1; i >= 0; i--) {
    		console.log(users[i])
    		var currentUser = users[i]
    		var user_full_name = currentUser.attributes.first_name + " "+ currentUser.attributes.last_name;
    		userFullNames.push(user_full_name);
    		
    	};
    	console.log(prefix);
		}
	});
	return userFullNames;
}
