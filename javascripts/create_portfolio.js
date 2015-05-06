$.extend({
    getUrlVars : function() {
        var vars = [], hash;
        var hashes = window.location.href.slice(
                window.location.href.indexOf('?') + 1).split('&');
        for ( var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    },
    getUrlVar : function(name) {
        return $.getUrlVars()[name];
    }
});

var populate_portfolio = function(portfolioNameARG) {
	Parse.initialize("d2fQK58HUnwBBqhiIOOXLkXiP84UmGyut4RRqazH", "VjZOZZqGxX1ZlavV2mMsirKcChshCshKn6X39qVf");
	var currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (!currentUser) {
	    window.location = "./index.html";
	} else {
		var ShowcasePortfolio = Parse.Object.extend("ShowcasePortfolio");
		var query = new Parse.Query(ShowcasePortfolio);
		query.equalTo("owner", currentUser.objectId);
		if (portfolioNameARG!==""&& portfolioNameARG !==null && portfolioNameARG !== undefined) { //selecting specific portfolio
			query.equalTo("name", portfolioNameARG);
		}
		query.find({
			success: function(portfolioResults) {
				if (portfolioResults.length === 0) {
					$(".removePortfolio").hide();
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
				
				if (portfolioNameARG==="" || portfolioNameARG ===null || portfolioNameARG === undefined) { //selecting specific portfolio
						for (var p=0; p<portfolioResults.length; p++) {
						var portfolio = portfolioResults[p];
						var portfolioName = portfolio.get("name");
						$(".dropdown-menu").append('<li role="presentation" id="list-items"><a role="menuitem" tabindex="-1" id="select_portfolio">'+portfolioName+'</a></li>');
					}
				}
				
				var PortfolioPhoto = Parse.Object.extend("PortfolioPhoto");
				var query = new Parse.Query(PortfolioPhoto);
				query.equalTo("portfolio", portfolioId );

				// var ShowcasePhoto = Parse.Object.extend("ShowcasePhoto");
				// var query = new Parse.Query(ShowcasePhoto);
				// query.equalTo("portfolio", portfolioId );
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
	}
};

$(document).ready(populate_portfolio(""));


$(document).on("click", "#confirm_delete_portfolio", function(){
	var portfolio_name = $("#current_text").text();
	var ShowcaseAlbum = Parse.Object.extend("ShowcasePortfolio");
	var query = new Parse.Query(ShowcaseAlbum);
	query.equalTo("name", portfolio_name);
	query.find({
		success:function(list) {
			var portfolio = list[0];
			portfolio.destroy({
				success: function(myObject) {
			    // The object was deleted from the Parse Cloud.
			    window.location = "./profile_page.html"; //add #new_portfolios

			},
			error: function(myObject, error) {
			    // The delete failed.
			    // error is a Parse.Error with an error code and message.
			}
		});
		}
	});
});







