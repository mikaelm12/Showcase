$(document).ready(function(){

	Parse.initialize("d2fQK58HUnwBBqhiIOOXLkXiP84UmGyut4RRqazH", "VjZOZZqGxX1ZlavV2mMsirKcChshCshKn6X39qVf");
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
		user.set("profile_picture", "http://files.parsetfss.com/0fc14c5b-74f9-402d-9b1e-69320ee1698c/tfss-53c354b7-db2f-4b08-92e3-0d1bad7ea01a-blank_profile.jpg");

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
	});


	$(document).on("click", "#login_button", function(){
			var username = $("#email_login").val();
			var password = $("#password_login").val();
			if(username == ''){
				//enter username and password
				$('#login_help').css('color','red'); 
			}
			
			else if(password == ''){
				//enter password
				$('#login_help').css('color','red'); 
				$('#login_help').value = 'Enter your password.'
			}
			
		Parse.User.logIn(username, password, {
			success: function(user) {
			// Do stuff after successful login.
			localStorage.setItem('currentUser', JSON.stringify(user));
			window.location = "./profile_page.html";
			},
			error: function(user, error) {
			// The login failed. Check error to see why.


				alert("Failed to login");
				//$('#login_help').css('color','red'); 
			}
		});
	});

	$("#password_login").keyup(function(event){
		if(event.keyCode == 13){
			var username = $("#email_login").val();
			var password = $("#password_login").val();
			if(username == ''){
				//enter username and password
				$('#login_help').css('color','red'); 
			}
			
			else if(password == ''){
				//enter password
				$('#login_help').css('color','red'); 
				$('#login_help').value = 'Enter your password.'
			}
			
			Parse.User.logIn(username, password, {
				success: function(user) {
				// Do stuff after successful login.
				localStorage.setItem('currentUser', JSON.stringify(user));
				window.location = "./profile_page.html";
				},
				error: function(user, error) {
				// The login failed. Check error to see why.

				alert("Failed to login");
				//$('#login_help').css('color','red'); 
				}
			});
		}
	});

	$("#email_login").keyup(function(event){
		if(event.keyCode == 13){
			var username = $("#email_login").val();
			var password = $("#password_login").val();
			if(username == ''){
				//enter username and password
				$('#login_help').css('color','red'); 
			}
			
			else if(password == ''){
				//enter password
				$('#login_help').css('color','red'); 
				$('#login_help').value = 'Enter your password.'
			}
			
			Parse.User.logIn(username, password, {
				success: function(user) {
				// Do stuff after successful login.
				localStorage.setItem('currentUser', JSON.stringify(user));
				window.location = "./profile_page.html";
				},
				error: function(user, error) {
				// The login failed. Check error to see why.

				alert("Failed to login");
				//$('#login_help').css('color','red'); 
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
			alert("Please enter a valid email address");
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
    		var currentUser = users[i]
    		var user_full_name = currentUser.attributes.first_name + " "+ currentUser.attributes.last_name;
    		userFullNames.push(user_full_name);
    		
    	};
    	console.log(prefix);
    	return userFullNames;
		}
	});
}
