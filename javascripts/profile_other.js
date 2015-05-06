
$(document).ready(function(){
	Parse.initialize("d2fQK58HUnwBBqhiIOOXLkXiP84UmGyut4RRqazH", "VjZOZZqGxX1ZlavV2mMsirKcChshCshKn6X39qVf");

	var userId = getParameterByName( "id", document.URL );
	var query = new Parse.Query(Parse.User);
	query.equalTo("objectId", userId);
	query.find({
	  success: function(results) {
	    // Do something with the returned Parse.Object values
	   	var currentUser = results[0];
	   	$("#artist_name").html("<h2>" + currentUser.get('first_name') + " " + currentUser.get("last_name") + "</h2>");
		$("#emailLink").html(currentUser.get("email"));
		$("#profile_pic_other").attr("src", currentUser.get("profile_picture"));
		$("#user-about").text(currentUser.attributes.bio);
		findMatchingUsers("");
	  },
	  error: function(error) {
	    alert("Error: " + error.code + " " + error.message);
	  }
	});	

	var currentUser = JSON.parse(localStorage.getItem('currentUser'));
	if (!currentUser){
		console.log("HERE");
		var profileButton = $(".home_button");
		profileButton.removeClass("home_button");
		console.log(profileButton);
		profileButton.html("Log In");
		profileButton.attr("data-toggle", "modal");
		profileButton.attr("data-target", "#myModal");
		var logoutButton = $(".logout_button");
		logoutButton.removeClass("logout_button");
		logoutButton.html("Register");
		logoutButton.attr("data-toggle", "modal");
		logoutButton.attr("data-target", "#loginModal");
	}

});