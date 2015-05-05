
$(document).ready(function(){

	Parse.initialize("d2fQK58HUnwBBqhiIOOXLkXiP84UmGyut4RRqazH", "VjZOZZqGxX1ZlavV2mMsirKcChshCshKn6X39qVf");
	var currentUser = JSON.parse(localStorage.getItem('currentUser'));
	var userAlbums = [];
	if (!currentUser) {
	    // do stuff with the user
	    window.location = "./index.html";
	} else {
		localStorage.setItem('currentUser', JSON.stringify(currentUser));
		$("#artist_name").html("<h2>" + currentUser.first_name + " " + currentUser.last_name + "</h2>");
		$("#emailLink").html(currentUser.email);
		$("#profile_pic").attr("src", currentUser.profile_picture);
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
		    var exportModal = $("#select-albums-div");
		    for (var i = 0; i < results.length; i++) { 
		    	var album = results[i];
		    	userAlbums.push(results[i]);
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

		    	var albumDiv = $("<div id='album_title_" + album.id + "'>");
		    	var albumTitleDiv  = $("<label><input type='checkbox' name='checkbox_" + album.id + "' id='" + album.id + "' class='check_all check_album' checked='checked'> " + album.get("name") + " </label><br>");
		    	albumDiv.append(albumTitleDiv);
		    	var ShowcasePhoto = Parse.Object.extend("ShowcasePhoto");
		    	var query = new Parse.Query(ShowcasePhoto);
		    	query.equalTo("album", album.id);
		    	(function(albumDiv, album){
		    			query.find({
				    		success: function(results) {
				    			// console.log("HERE: " + album.get("name"));
				    			for (var i = 0; i < results.length; i++) {
				    				var photo = results[i];
				    				var checkBox = $("<input type='checkbox' name='checkbox-1' id='" + photo.id + "' class='check_all check_image_" + album.id + "' selected' checked='checked'>");
				    				var image = $("<img class='border' width='80px' height='80px'>");
				    				image.attr("src", photo.get("photoUrl"));
				    				albumDiv.append(checkBox);
				    				albumDiv.append(image);
				    			}
				    			exportModal.append(albumDiv);
				    		},
				    		error: function(error) {
				    			alert("Error: " + error.code + " " + error.message);
				    		}
				    	});
		    	})(albumDiv, album);
				    	
		    }

		    // var albumDivs = [];
		    // var selectAlbumsDiv = $("<br><div id='select-albums-div'>");
		    // for (var i = 0; i < userAlbums.length; i++){
		    // 	var album = userAlbums[i];
		    // 	var albumDiv = $("<div id='album_title_" + album.id + "'>");
		    // 	var albumTitleDiv  = $("<label><input type='checkbox' name='checkbox-1' id='checkbox-1' class='checkbox-1 check-album1' checked='checked'> " + album.get("name") + " </label><br>");
		    // 	albumDiv.append(albumTitleDiv);
		    // 	albumDivs.push(albumDiv);
		    // 	var ShowcasePhoto = Parse.Object.extend("ShowcasePhoto");
		    // 	var query = new Parse.Query(ShowcasePhoto);
		    // 	query.equalTo("album", album.id);
		    // 	query.find({
		    // 		success: function(results) {
		    // 			// console.log("HERE: " + album.get("name"));
		    			
		    // 			var albumDiv = albumDivs[i];
		    // 			console.log(albumDivs[i]);
		    // 			for (var i = 0; i < results.length; i++) {
		    // 				var photo = results[i];
		    // 				var checkBox = $("<input type='checkbox' name='checkbox-1' id='" + photo.id + "' class='checkbox-1 check-image1 selected' checked='checked'>");
		    // 				var image = $("<img class='border' width='80px' height='80px'>");
		    // 				image.attr("src", photo.get("photoUrl"));
		    // 				albumDiv.append(checkBox);
		    // 				albumDiv.append(image);
		    // 			}
		    // 			selectAlbumsDiv.append(albumDiv);
		    // 		},
		    // 		error: function(error) {
		    // 			alert("Error: " + error.code + " " + error.message);
		    // 		}
		    // 	});
		    // 	// selectAlbumsDiv.append(albumDiv);

		    // };

		    // $("#beforeSelected").after(selectAlbumsDiv);

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

$(document).on("click", "#profile_pic", function(){
	$("#myAddProfile").modal("show");
});

var files =  []

$('#fileselect').bind("change", function(e) {
	files = e.target.files || e.dataTransfer.files;
});

$(document).on("click", "#upload_profile_button", function(){
	if (files.length == 0){
		alert("Please select a file!");
		return;
	}
	for (var i=0; i < files.length ; i++){
		file= files[i];
		var file_name = file.name;
		var serverUrl = 'https://api.parse.com/1/files/' + encodeURIComponent(file_name.replace(/\s+/g, ''));
		if (!file.type.match('image.*')) {
			break;
			$("#myAddProfile").modal("hide");
		}

		var query = new Parse.Query(Parse.User);
		query.equalTo("objectId", currentUser.objectId);
		query.find({
			success: function(users) {
				console.log(currentUser.objectId);
				var user = users[0];
				$.ajax({
					type: "POST",
					beforeSend: function(request) {
						request.setRequestHeader("X-Parse-Application-Id", 'd2fQK58HUnwBBqhiIOOXLkXiP84UmGyut4RRqazH');
						request.setRequestHeader("X-Parse-REST-API-Key", 'MhIrAO8s3irJdIHTYX5AFBIAtZ95K7uCN02rx4U4');
						request.setRequestHeader("Content-Type", file.type);
					},
					url: serverUrl,
					data: file,
					processData: false,
					contentType: false,
					success: function(data) {
						user.set("profile_picture", data.url);
						user.save();
						currentUser.profile_picture =  data.url;
						localStorage.setItem('currentUser', JSON.stringify(currentUser));
						$("#profile_pic").attr("src", data.url);
						$("#myAddProfile").modal("hide");
					},
					error: function(user, error) {
						alert("Failed to find user!");
					}
				});
			}, error: function(user, error){
				console.log("ERROR");
			}

		});

	}

});

});