
$(document).ready(function(){

	Parse.initialize("wS5FBQCauFezsFutdFGGMrZMgEs3XADKfTvULhMb", "jy5VORCXKwEErZvFUHMKIsvD55YEYtfYLZIpc0JD");
	var currentUser = JSON.parse(localStorage.getItem('currentUser'));
	
  	if (!currentUser) {
	    // do stuff with the user
	    window.location = "./index.html";
	} else {
		localStorage.setItem('currentUser', JSON.stringify(currentUser));
		$("#artist_name").html("<h2>" + currentUser.first_name + " " + currentUser.last_name + "</h2>");
		$("#emailLink").html(currentUser.email);
		var ShowcaseAlbum = Parse.Object.extend("ShowcaseAlbum");
		var query = new Parse.Query(ShowcaseAlbum);
		query.equalTo("owner", currentUser.objectId);
		query.find({
		  success: function(results) {
		    // Do something with the returned Parse.Object values
		    var rowCount = 0;
			var colCount = 0;
			var rowDefined = true;
			var colDefined = true;
			var albumGrid = $("#albumGrid");
		    for (var i = 0; i < results.length; i++) { 
		    	var album = results[i];
		    	if (colCount != 0 && (colCount % 3 == 0)){
					rowCount++;
				}

				var tableCell = $("#cell-"+i);
				var albumName = album.get("name");
				var albumTitle = $("<h2 class='albumTitle'>" + albumName + "</h2>");
				var removeButton = $("<div class='input-group-btn'><button type='submit' class='btn btn-sm btn-default remove' id='" + album.id + "'><span class='glyphicon glyphicon-remove' aria-hidden='true'></span></button></div>");
				var titleField = $("<div class='input-group'></div>");
				titleField.append(albumTitle);
				titleField.append(removeButton);

				var image = $("<img class='grid_image album img-responsive change_opacity img_details' src='" + album.get('cover') + "' id='" + album.id + "' name='" + albumName + "'>");

				if (tableCell.length == 0){
		        	console.log("CELL UNDEFINED");
		        	colDefined = false;
		        	tableCell = $("<td class='grid_cell' id='cell-" + i + "'>");
				}

				tableCell.append(titleField);
				tableCell.append(image);

				var tableRow = $("#row-"+ rowCount);

				if (tableRow.length == 0){
	      			console.log("ROW UNDEFINED");
	      			console.log("NEW ROW: " + rowCount);
	      			rowDefined = false;
	      			tableRow = $("<tr id='row-" + rowCount + "'>");
				}

				if (!colDefined){
				    tableRow.append(tableCell); 
				}

				if (!rowDefined){
	      			console.log("ROW APPENDED");
	      			albumGrid.append(tableRow);
				}

				colCount++;
		      
		    }
		  },
		  error: function(error) {
		    alert("Error: " + error.code + " " + error.message);
		  }
		});
	}	
	
	
	
	$(document).on("click", ".album", function(){
		window.location = "./album_page.html?id=" + this.id;
	});

	$(document).on("click", ".remove", function(){
		$("#deleteAlbumButton").attr("albumId", this.id);
		$("#myDelete").modal("show");
	});

	$(document).on("click", "#deleteAlbumButton", function(){
		var albumId = $("#deleteAlbumButton").attr("albumId");
		var ShowcaseAlbum = Parse.Object.extend("ShowcaseAlbum");
		var query = new Parse.Query(ShowcaseAlbum);
		query.equalTo("objectId", albumId);
		query.find({
		success:function(list) {
			var album = list[0];
			album.destroy({
			  success: function(myObject) {
			    // The object was deleted from the Parse Cloud.
			    var ShowcasePhoto = Parse.Object.extend("ShowcasePhoto");
				var query = new Parse.Query(ShowcasePhoto);
				query.equalTo("album", albumId);
				query.find({
					success:function(list) {
						for (var i=0; i < list.length; i++){
							var photo = list[i];
							photo.destroy();
						}
						$("#myDelete").modal("hide");
						window.location = "./profile_page.html";
					}
				});
			    
			  },
			  error: function(myObject, error) {
			    // The delete failed.
			    // error is a Parse.Error with an error code and message.
			  }
			}); 	
		  }
		});
	});
});