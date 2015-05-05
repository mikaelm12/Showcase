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

	Parse.initialize("d2fQK58HUnwBBqhiIOOXLkXiP84UmGyut4RRqazH", "VjZOZZqGxX1ZlavV2mMsirKcChshCshKn6X39qVf");
	var currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (!currentUser) {
	    // do stuff with the user
	    window.location = "./index.html";
	} else {
		var album_id = $.getUrlVar('id');
		var albumTitle = $("#album_name_input");
		albumTitle.attr("id", "album_title_" + album_id);
		albumTitle.attr("class", "album_title");
		$(".editAlbumTitle").attr("id", album_id);
		var ShowcaseAlbum = Parse.Object.extend("ShowcaseAlbum");
		var query = new Parse.Query(ShowcaseAlbum);
		query.equalTo("objectId", album_id);
		query.find({
			success: function(results) {
				var album = results[0];
				albumTitle.html(album.get('name'));
				var ShowcasePhoto = Parse.Object.extend("ShowcasePhoto");
				var query = new Parse.Query(ShowcasePhoto);
				query.equalTo("album", album_id );
				query.find({
				  success: function(results) {
				    var rowCount = 0;
					var colCount = 0;
					var rowDefined = true;
					var colDefined = true;
					var photoGrid = $("#photoGrid");
				    for (var i = 0; i < results.length; i++) { 
				    	var photo = results[i];
				    	if (colCount != 0 && (colCount % 2 == 0)){
							rowCount++;
						}

						var tableCell = $("#cell-"+i);
						var photoTitle = photo.get("title");
						if (photoTitle == "" || photoTitle == undefined){
							photoTitle = "** No Title Available **";
						}
						var photoTitle = $("<h2 class='photoTitle' id='title_" + photo.id + "'>" + photoTitle + "</h2>");
						var editButton = $("<div class='input-group-btn'><button type='submit' class='btn btn-sm btn-default edit' id='" + photo.id + "'><span class='glyphicon glyphicon-pencil' aria-hidden='true'></span></button></div>");
						var image = $("<img class='grid_image img-responsive' src='" + photo.get("photoUrl") + "' id='grid_image_" + photo.id + "'>");
						var removeButton = $("<div class='input-group-btn'><button type='submit' class='btn btn-sm btn-default remove' id='" + photo.id + "'><span class='glyphicon glyphicon-remove' aria-hidden='true'></span></button></div>");
						var titleField = $("<div class='input-group'></div>");
						titleField.append(editButton);
						titleField.append(photoTitle);
						titleField.append(removeButton);
						var photo_description = photo.get('description');
						if (photo_description == "" || photo_description == undefined){
							photo_description = "** No description available **";
						}
						var photoDesc = $("<p class='desc' id='desc_" + photo.id + "'>" + "<b>Description</b>: " + photo_description + '</p>');

						if (tableCell.length == 0){
				        	console.log("CELL UNDEFINED");
				        	colDefined = false;
				        	tableCell = $("<td class='grid_cell' id='cell-" + i + "'>");
						}

						tableCell.append(titleField);
						tableCell.append(image);
						tableCell.append(photoDesc);

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
			      			photoGrid.append(tableRow);
						}

						colCount++;
				      
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
	
	
    $(document).on("click", ".remove", function(){
	    $("#deletePhotoButton").attr("photo_id", this.id);
	    $("#myDelete").modal("show");
	 });

    $(document).on("click", ".editAlbumTitle", function(){
    	var title = $("#album_title_" + this.id);
     	var titleText;
     	var textField;
     	var editBox;
     	if (title.is("h1")){
     		titleText = title.html();
	    	editBox = $("<input class='editBoxTitle' value='" + titleText + "' id='album_title_" + this.id  + "'>");
	    	title.remove();
	    	$("#album_title_wrapper").append(editBox);
     	} else {
     		titleText = title.val();
     		textField = $("<h1 id='album_title_" + this.id + "' class='album_title'>" + titleText + "</h1>");
     		title.remove();
     		$("#album_title_wrapper").append(textField);
     		var ShowcaseAlbum = Parse.Object.extend("ShowcaseAlbum");
			var query = new Parse.Query(ShowcaseAlbum);
			query.equalTo("objectId", this.id);
			query.find({
				success: function(results) {
					var album = results[0];
					album.set("name", titleText);
					album.save();
				},
				error: function(error) {
				alert("Error: " + error.code + " " + error.message);
				}
			});

     	}
    });

     $(document).on("click", ".edit", function(){

     	var title = $("#title_" + this.id);
     	var titleText;
     	var editBox;
     	var textField;
     	var desc = $("#desc_" + this.id);
     	var descText;
     	var descEditBox;
     	if (title.is("h2")){
     		titleText = title.html();
	    	editBox = $("<input class='editBox' value='" + titleText + "' id='title_" + this.id  + "'>");
	    	title.remove();
	    	$("#" + this.id).parent().after(editBox);
	    	descText = desc.html().substring(20, desc.html().length);
	    	descEditBox = $("<input class='editBoxDesc' value='" + descText + "' id='desc_" + this.id  + "'>")
	    	desc.remove();
	    	$("#grid_image_" + this.id).after(descEditBox);

     	} else {
     		titleText = title.val();
     		textField = $("<h2 class='photoTitle' id='title_" + this.id + "'>" + titleText + "</h2>");
     		title.remove();
     		$("#" + this.id).parent().after(textField);
     		descText = desc.val();
     		paragraph = $("<p class='desc' id='desc_" + this.id + "'>" + "<b>Description</b>: " + descText + '</p>');
     		desc.remove();
     		$("#grid_image_" + this.id).after(paragraph);

     		var ShowcasePhoto = Parse.Object.extend("ShowcasePhoto");
			var query = new Parse.Query(ShowcasePhoto);
			query.equalTo("objectId", this.id);
			query.find({
				success: function(results) {
					var photo = results[0];
					photo.set("title", titleText);
					photo.set("description", descText);
					photo.save();
				},
				error: function(error) {
				alert("Error: " + error.code + " " + error.message);
				}
			});
     	}
	 });

	$(document).on("click", "#deletePhotoButton", function(){
		console.log("HERE DELETE");
		var photoId = $("#deletePhotoButton").attr("photo_id");
		var ShowcasePhoto = Parse.Object.extend("ShowcasePhoto");
		var query = new Parse.Query(ShowcasePhoto);
		query.equalTo("objectId", photoId);
		query.find({
		success:function(list) {
		  var photo= list[0];

		photo.destroy({
		  success: function(myObject) {
		    // The object was deleted from the Parse Cloud.
		    $("#myDelete").modal("hide");
		  	window.location = "./album_page.html?id=" + $.getUrlVar("id") + "&name=" + $.getUrlVar("name");
		  },
		  error: function(myObject, error) {
		    // The delete failed.
		    // error is a Parse.Error with an error code and message.
		  }
		});  
		}
		});
	});

	var files; 
	var photos_array = [];

	$('#fileselect').bind("change", function(e) {
      	files = e.target.files || e.dataTransfer.files;
     });

	$(document).on("click", "#upload_button", function() {
		for (var i=0; i < files.length ; i++){
			photo = files[i];
			if (!photo.type.match('image.*')) {
       			 continue;
      		}
      		console.log("UPLOADING");
      		photos_array.push(photo);
      	}

      	var photo_count = 0;

      	for (var i = 0; i < photos_array.length; i++){
        	var file = photos_array[i];
        	var file_name = file.name;
        	var serverUrl = 'https://api.parse.com/1/files/' + encodeURIComponent(file_name.replace(/\s+/g, ''));

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
		    	   var photo_name;
		    	   var file_name = data.name.substring(42, data.name.length);
		    	   if (file_name.indexOf("jpeg") > -1){
		    	   		photo_name = file_name.substring(0, file_name.length - 5).replace(/\s+/g, '')
		    	   } else {
		    	   		photo_name = file_name.substring(0, file_name.length - 4).replace(/\s+/g, '');
		    	   }
		    	   var ShowcasePhoto = Parse.Object.extend("ShowcasePhoto");
		    	   var photo = new ShowcasePhoto();
		    	   photo.set("album", album_id);
		    	   photo.set("photoUrl", data.url);
		    	   
		    	   photo.save(null, {
					  success: function(photo) {
					    // Execute any logic that should take place after the object is saved.
					    // alert('New object created with objectId: ' + photo.id);
					    photo_count++;
					    
					    if (photo_count === photos_array.length){
					    	// $('#Searching_Modal').modal('hide');
					    	window.location = "./album_page.html?id=" + album_id;
					    }
					  }
					});
					},
					error: function(data) {
						          var obj = jQuery.parseJSON(data);
						          alert(obj.error);
						    }
					});
		};
	});

});