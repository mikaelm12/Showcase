
$(document).ready(function(){
	Parse.initialize("wS5FBQCauFezsFutdFGGMrZMgEs3XADKfTvULhMb", "jy5VORCXKwEErZvFUHMKIsvD55YEYtfYLZIpc0JD");

	var userId = getParameterByName( "id", document.URL );
	var query = new Parse.Query(Parse.User);
	query.equalTo("objectId", userId);
	query.find({
	  success: function(results) {
	    // Do something with the returned Parse.Object values
	   	var currentUser = results[0];
	   	$("#artist_name").html("<h2>" + currentUser.get('first_name') + " " + currentUser.get("last_name") + "</h2>");
		$("#emailLink").html(currentUser.get("email"));
		$("#profile_pic").attr("src", currentUser.get("profile_picture"));
		findMatchingUsers("");
	  },
	  error: function(error) {
	    alert("Error: " + error.code + " " + error.message);
	  }
	});	
});