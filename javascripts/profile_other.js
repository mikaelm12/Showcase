
var populate_other_portfolio = function(currentUserId, selectedPortfolio) {
	var ShowcasePortfolio = Parse.Object.extend("ShowcasePortfolio");
	var query = new Parse.Query(ShowcasePortfolio);
	query.equalTo("owner", currentUserId);
	if (selectedPortfolio!==null) {
		query.equalTo("name", selectedPortfolio);
	}
	query.find({
		success: function(portfolioResults) {
							console.log("portfolios found:"+portfolioResults.length);

			if (portfolioResults.length === 0) {
				return;
			} else {

				var hr = '<div class="style2"/><img src="images/hr4.png" width="100%"></div>';
				$("#current_portfolio").append(hr);

				var portfolio = portfolioResults[0];

				var portfolioName = portfolio.get("name");
				// console.log("showing:"+portfolioName);
				var portfolioId = portfolio.id;

				//fill in the dropdown
				$(document.getElementById('current_text')).text(portfolioName);
				
				if (selectedPortfolio===null) {
					for (var p=0; p<portfolioResults.length; p++) {
						var portfolio = portfolioResults[p];
						var portfolioName = portfolio.get("name");
						$(".dropdown-menu").append('<li role="presentation" id="list-items"><a role="menuitem" tabindex="-1" id="select_other_portfolio">'+portfolioName+'</a></li>');
					}
				}
				
				
				
				var PortfolioPhoto = Parse.Object.extend("PortfolioPhoto");
				var query = new Parse.Query(PortfolioPhoto);
				query.equalTo("portfolio", portfolioId );
				query.find({ //photos that belong to this portfolio
					success: function(results) {
						for (var i = 0; i < results.length; i++) { 
							var photo = results[i];				    	
							var photoTitle = photo.get("title");
							if (photoTitle == "" || photoTitle == undefined){
								photoTitle = "No Title";
							}
						// var photoTitle = $("<h2 class='photoTitle' id='title_" + photo.id + "'>" + photoTitle + "</h2>");
						var image = "<img class='img-responsive portfolio-item' src='"+photo.get("photoUrl") +"' alt='"+photoTitle+"'>";
						
						// var titleField = $("<div class='input-group'></div>");
						// titleField.append(photoTitle);
						var photo_description = photo.get('description');
						if (photo_description == "" || photo_description == undefined){
							photo_description = "No description available";
						}

						var photoStuff = '<br><br><div class="row image_div" align="middle">'
						+'<div class="col-md-12"><div class="thumb">'+image
						+'<div class="thumb_meta"><span style="font-size:150%"><b>'+photoTitle+'</b></span><br>'
						+photo_description+'</div></div></div></div><br>';
						
						$("#current_portfolio").append(photoStuff);


					}
					$("#current_portfolio").append(hr);

				},
				error: function(error) {
					alert("Error: " + error.code + " " + error.message);
				}
			});
				} //end else
			},
			error: function(error) {
				alert("Error: " + error.code + " " + error.message);
			}
		});

};

var switch_portfolio = function(selectedPortfolio) {
	var userId = getParameterByName( "id", document.URL );
	var query = new Parse.Query(Parse.User);
	query.equalTo("objectId", userId);
	query.find({
		success: function(results) {
	    // Do something with the returned Parse.Object values
	    var currentUser = results[0];
	    populate_other_portfolio(currentUser.id, selectedPortfolio);
	},
	error: function(error) {
		alert("Error: " + error.code + " " + error.message);
	}
});	
};


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
	    $("#firstName").html(currentUser.get('first_name'));
	    findMatchingUsers("");
	    populate_other_portfolio(currentUser.id, null);
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
