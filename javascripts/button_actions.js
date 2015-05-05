
$(document).on("click", ".home_button", function(){
	window.location = './profile_page.html';
});

$(document).on("click", ".logout_button", function(){
	Parse.initialize("d2fQK58HUnwBBqhiIOOXLkXiP84UmGyut4RRqazH", "VjZOZZqGxX1ZlavV2mMsirKcChshCshKn6X39qVf");
	Parse.User.logOut();
	localStorage.removeItem("currentUser");
	window.location = './index.html';
});

	$(document).on("click", ".searchButton", function(){
	window.location = "./profilepage.html"
});

$(document).on("click", ".portfolioClick", function(){
	$('#portfolioPDF').modal('show');
});

// Listen for click on toggle checkbox
$(document).on("click", ".select-all", function(){
	$(".check_all").prop('checked', $(this).prop('checked'));
});

// var clickHandler = function(arg) {
// 	return function() {
// 		$(".check-image"+arg).prop('checked', $(this).prop('checked'));
// 	};
// }

// listen for click on album, check all photos in that album
// for (var i=1; i<=10; i++) {
// 	$(document).on("click", ".check-album"+i, clickHandler(i));
// }



$(document).on("click", ".check_album", function(){
	console.log("HERE");
	var id = this.id;
	console.log(id);
	$(".check_image_" + id).prop("checked", $(this).prop("checked"));
});


// function checkHandler(num) {
// 		$(".check-album"+num).click (
// 			function() {$(".check_image"+num).prop('checked', $(this).prop('checked'));}
// 			)
// 	}



// $(document).on("click", ".check-album"+1, function(){
// 	$(".check-image"+1).prop('checked', $(this).prop('checked'));
// });	
// $(document).on("click", ".check-album"+2, function(){
// 	$(".check-image"+2).prop('checked', $(this).prop('checked'));
// });	



// Listen for click on toggle checkbox
$(document).on("click", ".checkbox-1", function(){
	
	if($(".checkbox-1").prop('checked') != true){
		$(".select-all").prop('checked', false);
		// console.log($(".checkbox-1").prop('checked'));
		
		// $("#createPortfolioButton").attr("disabled","true");
	}else{
		//$(".select-all").prop('checked', $(this).prop('checked'));
		//console.log("checked");
		// $("#createPortfolioButton").removeAttr("disabled");
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
