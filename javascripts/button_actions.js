
$(document).on("click", ".home_button", function(){
	window.location = './profile_page.html';
});

$(document).on("click", ".logout_button", function(){
	localStorage.removeItem("currentUser");
	window.location = './index.html';
});

$(document).on("click", "#create_album_button", function(){
	Parse.User.logOut();
	window.location = './creating_album_page.html';
});