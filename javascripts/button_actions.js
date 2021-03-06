
$(document).on("click", ".home_button", function(){
	window.location = './profile_page.html';
});

$(document).on("click", ".logout_button", function(){
	Parse.initialize("d2fQK58HUnwBBqhiIOOXLkXiP84UmGyut4RRqazH", "VjZOZZqGxX1ZlavV2mMsirKcChshCshKn6X39qVf");
	Parse.User.logOut();
	localStorage.removeItem("currentUser");
	window.location = './index.html';
});



$(document).on("click", ".portfolioClick", function(){
	$('#portfolioPDF').modal('show');
});

// Listen for click on toggle checkbox



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
    
});

$(document).on("click", "#select_portfolio", function() {
	var parent =$('html,body');
	var element =  document.getElementById('current_portfolio');
	var selected_portfolio =$(this).text();
    $(document.getElementById('current_text')).text(selected_portfolio);
    //empty current_portfolio
    $(element).empty();
    //set current_portfolio to selected portfolio
    populate_portfolio(selected_portfolio);
 
});

$(document).on("click", "#select_other_portfolio", function() {
	var parent =$('html,body');
	var element =  document.getElementById('current_portfolio');
	var selected_portfolio =$(this).text();

    $(document.getElementById('current_text')).text(selected_portfolio);
    //empty current_portfolio
    $(element).empty();
    //set current_portfolio to selected portfolio
    switch_portfolio(selected_portfolio);
 
})

$(document).on("click", ".removePortfolio", function(){
	var pf_name_modal = $("#current_text").text();
	$("#pfNameModal").text(pf_name_modal);
	$("#removePortfolioModal").modal("show");
 });




$(document).on("click", "#create_album_button", function(){
	Parse.User.logOut();
	window.location = './creating_album_page.html';
});
