$(document).on("click", "#register_button", function(){
	window.location = "./blank_profile_page.html"
});

$(document).on("click", "#login_button", function(){
	window.location = "./profile_after_page.html"
});

$(document).on("click", "#upload_button", function(){
	window.location = "./creating_album_page.html"
});

$(document).on("click", "#save_album_button", function(){
	window.location = "./profile_after_page.html"
});

$(document).on("click", "#cancel_album_button", function(){
	window.location = "./blank_profile_page.html"
});

$(document).on("click", ".logout_button", function(){
	window.location = "./index.html"
});

$(document).on("click", ".create_album", function(){
	window.location = "./creating_album_page.html"
});

$(document).on("click", ".go_to_album", function(){
	window.location = "./album_page.html"
});

$(document).on("click", ".home_button_blank", function(){
	window.location = "./blank_profile_page.html"
});

$(document).on("click", ".home_button_after", function(){
	window.location = "./profile_after_page.html"
});

$(document).on("click", ".searchButton", function(){
	window.location = "./profilepage.html"
});
$(document).on("click", ".portfolioClick", function(){
	$('#portfolioPDF').modal('show');
});

// Listen for click on toggle checkbox
$(document).on("click", ".select-all", function(){
	$(".checkbox-1").prop('checked', $(this).prop('checked'));
});

// Listen for click on toggle checkbox
$(document).on("click", ".checkbox-1", function(){
	$(".select-all").prop('checked', $(this).prop('checked'));
});

$(document).on("click", "#exportButton", function(){
	$(".select-all").prop('checked', "checked");
	$(".checkbox-1").prop('checked', "checked");
});



