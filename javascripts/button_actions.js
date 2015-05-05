
$(document).on("click", ".home_button", function(){
	window.location = './profile_page.html';
});

$(document).on("click", ".logout_button", function(){
	Parse.initialize("d2fQK58HUnwBBqhiIOOXLkXiP84UmGyut4RRqazH", "VjZOZZqGxX1ZlavV2mMsirKcChshCshKn6X39qVf");
	Parse.User.logOut();
	localStorage.removeItem("currentUser");
	window.location = './index.html';
});

// $(document).on("click", ".searchButton", function(){
// 	window.location = "./profilepage.html"
// });

$(document).on("click", ".portfolioClick", function(){
	$('#portfolioPDF').modal('show');
});

// Listen for click on toggle checkbox
$(document).on("click", ".select-all", function(){
	$(".checkbox-1").prop('checked', $(this).prop('checked'));
	if($(".checkbox-1").prop('checked') != true){
		$("#createPortfolioButton").attr("disabled","true");
	}else{
		$("#createPortfolioButton").removeAttr("disabled");
	}
});

// Listen for click on toggle checkbox
$(document).on("click", ".checkbox-1", function(){
	
	if($(".checkbox-1").prop('checked') != true){
		$(".select-all").prop('checked', false);
		console.log($(".checkbox-1").prop('checked'));
		
		$("#createPortfolioButton").attr("disabled","true");
	}else{
		//$(".select-all").prop('checked', $(this).prop('checked'));
		//console.log("checked");
		$("#createPortfolioButton").removeAttr("disabled");
	}
});

$(document).on("click", "#exportButton", function(){
	$(".select-all").prop('checked', true);
	$(".checkbox-1").prop('checked', true);
	$("#createPortfolioButton").removeAttr("disabled");

});

$(document).on("click", "#scroll_to_albums", function() {
	var parent =$('html,body');
	var element =  document.getElementById('album_container');
    // parent.animate({ scrollTop:1000}, 'slow');
    parent.animate({ scrollTop: $(element).offset().top }, 'slow');
})

$(document).on("click", "#select_portfolio", function() {
	var parent =$('html,body');
	var element =  document.getElementById('current_portfolio');
    // parent.animate({ scrollTop:1000}, 'slow');
    parent.animate({ scrollTop: $(element).offset().top }, 'slow');
    // console.log("this.text:"+$(this).text());
    // console.log("current_text:"+$(document.getElementById('current_text')).text()); //.val());
    $(document.getElementById('current_text')).text($(this).text()); //
})





$(document).on("click", "#create_album_button", function(){
	Parse.User.logOut();
	window.location = './creating_album_page.html';
});
