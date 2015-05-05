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

$(document).ready(function(){
	$("#no_portfolio").hide();

	Parse.initialize("d2fQK58HUnwBBqhiIOOXLkXiP84UmGyut4RRqazH", "VjZOZZqGxX1ZlavV2mMsirKcChshCshKn6X39qVf");
	var currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (!currentUser) {
	    window.location = "./index.html";
	} else {
		var portContainer = $("#portfolio_container");
		var ShowcasePortfolio = Parse.Object.extend("ShowcasePortfolio");
		var query = new Parse.Query(ShowcasePortfolio);
		query.equalTo("owner", currentUser);
		query.find({
			success: function(portfolioResults) {
				if (portfolioResults.length === 0) {
					// $(".portfolio_row").remove();
					// $("#no_portfolio").show();
					// return;
				}
				
				//fill in the dropdown
				for (var p=0; p<portfolioResults.length; p++) {
					var portfolio = portfolioResults[p];
					var portfolioName = portfolio.get("name");
					$(".dropdown-menu").append('<li role="presentation" id="list-items"><a role="menuitem" tabindex="-1" id="select_portfolio">'+portfolioName+'</a></li>');
				}

				var portfolio = portfolioResults[0];
				var portfolioName = portfolio.get("name");
				var portfolioId = portfolio.get("objectId");
				var ShowcasePhoto = Parse.Object.extend("ShowcasePhoto");
				var query = new Parse.Query(ShowcasePhoto);
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
						var image = $("<img class='img-responsive portfolio-item' src='" + photo.get("photoUrl") + "' alt='"+photoTitle+"'>");
						// var titleField = $("<div class='input-group'></div>");
						// titleField.append(photoTitle);
						var photo_description = photo.get('description');
						if (photo_description == "" || photo_description == undefined){
							photo_description = "No description available";
						}

						var photoStuff = '<br><div class="row image_div" align="middle">'
						+'<div class="col-md-12"><div class="thumb">'+image
						+'<div class="thumb_meta"><span style="font-size:150%"><u>'+photoTitle+'</u></span><br>'
						+photo_description+'</div></div></div></div><br>';
						
						portContainer.append(photoStuff);
						
				    }
				  },
				  error: function(error) {
				    alert("Error: " + error.code + " " + error.message);
				  }
				});

				},
				error: function(error) {
				alert("Error: " + error.code + " " + error.message);
				}
			});
	}


    // DELETE PORTFOLIO

	// $(document).on("click", "#deletePhotoButton", function(){
	// 	console.log("HERE DELETE");
	// 	var photoId = $("#deletePhotoButton").attr("photo_id");
	// 	var ShowcasePhoto = Parse.Object.extend("ShowcasePhoto");
	// 	var query = new Parse.Query(ShowcasePhoto);
	// 	query.equalTo("objectId", photoId);
	// 	query.find({
	// 	success:function(list) {
	// 	  var photo= list[0];

	// 	photo.destroy({
	// 	  success: function(myObject) {
	// 	    // The object was deleted from the Parse Cloud.
	// 	    $("#myDelete").modal("hide");
	// 	  	window.location = "./album_page.html?id=" + $.getUrlVar("id") + "&name=" + $.getUrlVar("name");
	// 	  },
	// 	  error: function(myObject, error) {
	// 	    // The delete failed.
	// 	    // error is a Parse.Error with an error code and message.
	// 	  }
	// 	});  
	// 	}
	// 	});
	// });

});