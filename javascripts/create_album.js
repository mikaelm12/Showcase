$(document).ready(function(){

	Parse.initialize("wS5FBQCauFezsFutdFGGMrZMgEs3XADKfTvULhMb", "jy5VORCXKwEErZvFUHMKIsvD55YEYtfYLZIpc0JD");
	var photos_array = [];

	var files;
	var photoGrid = $("#photoGrid");
	var index = 0;
	var rowCount = 0;
	var colCount = 0;
	
	$('#fileselect').bind("change", function(e) {
      	files = e.target.files || e.dataTransfer.files;
     });

	$(document).on("click", "#upload_button", function() {
      	console.log("CLICKED");
		for (var i=0; i < files.length ; i++){
			photo = files[i];
			if (!photo.type.match('image.*')) {
       			 continue;
      		}

      		console.log("UPLOADING");

      		photos_array.push(photo);

			if (colCount != 0 && (colCount % 3 == 0)){
				rowCount++;
			}

			var fr = new FileReader();

			fr.onload = (function(theFile, i, colCount, rowCount) {
					var rowDefined = true;
					var colDefined = true;
					var file_name;
					if (theFile.name.indexOf("jpeg") > -1){
						file_name = theFile.name.substring(0, theFile.name.length - 5);
					} else {
						file_name = theFile.name.substring(0, theFile.name.length - 4);
					}
					console.log("ROW: " + rowCount);
					console.log("COL: " + colCount);
			        return function(e) {
				        var tableCell = $("#cell-"+i);
				        var image = $("<img class='grid_image change_opacity img-responsive img_details'>");
						image.attr("src", e.target.result);

				        if (tableCell.length == 0){
				        	console.log("CELL UNDEFINED");
				        	colDefined = false;
				        	tableCell = $("<td class='grid_cell' id='cell-" + i + "'>");
				        }


				        tableCell.append($("<input class='photoTitle' id='title_" + file_name.replace(/\s+/g, '') + "' placeholder='Photo Title' type='text'>"));
				        tableCell.append(image);
				        tableCell.append($("<input class='photoDescription' id='desc_" + file_name.replace(/\s+/g, '') + "' placeholder='Photo Description...' type='text'>"));	

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
			        };
			})(photo, i+index, colCount, rowCount);

			fr.readAsDataURL(photo);

			colCount++;
		}

		index += files.length;
		$("#myAddPictures").modal("hide");
    
	});
      	
	$(document).on('click', '#save_album_button', function() {
		var album_name = $("#album_name_input").val();
		var re = /\w/;

		if (re.exec(album_name) === null){
			alert("Please enter an album title!");
		}

		album_name = $("#album_name_input").val();

		var photo_count = 0;

	   var ShowcaseAlbum = Parse.Object.extend("ShowcaseAlbum");
       var album = new ShowcaseAlbum();
       album.set("owner", "1x2x3x4x5");
       album.set("name", album_name);
       album.save(null, {
		  success: function(album) {
		  	  for (var i = 0; i < photos_array.length; i++){
		        	var file = photos_array[i];
		        	var file_name = file.name;
		        	var serverUrl = 'https://api.parse.com/1/files/' + encodeURIComponent(file_name.replace(/\s+/g, ''));

				    $.ajax({
				        type: "POST",
				        beforeSend: function(request) {
				          request.setRequestHeader("X-Parse-Application-Id", 'wS5FBQCauFezsFutdFGGMrZMgEs3XADKfTvULhMb');
				          request.setRequestHeader("X-Parse-REST-API-Key", 'PxiTZfopXT5xaT2p8rgvpuyjSA3Tgq3OnqmxPTFY');
				          request.setRequestHeader("Content-Type", file.type);
				        },
				        url: serverUrl,
				        data: file,
				        processData: false,
				        contentType: false,
				        success: function(data) {
				           // alert("File available at: " + data.url);
				           // $('#Searching_Modal').modal('show');
				    	   var photo_name;
				    	   var file_name = data.name.substring(42, data.name.length);
				    	   if (file_name.indexOf("jpeg") > -1){
				    	   		photo_name = file_name.substring(0, file_name.length - 5).replace(/\s+/g, '')
				    	   } else {
				    	   		photo_name = file_name.substring(0, file_name.length - 4).replace(/\s+/g, '');
				    	   }
				    	   var ShowcasePhoto = Parse.Object.extend("ShowcasePhoto");
				    	   var photo = new ShowcasePhoto();
				    	   photo.set("album", album.id);
				    	   photo.set('title', $("#title_" + photo_name).val());
				    	   photo.set("description", $("#desc_" + photo_name).val());
				    	   photo.set("photoUrl", data.url);
				    	   
				    	   photo.save(null, {
							  success: function(photo) {
							    // Execute any logic that should take place after the object is saved.
							    // alert('New object created with objectId: ' + photo.id);
							    photo_count++;
							    if (photo_count === photos_array.length){
							    	// $('#Searching_Modal').modal('hide');
							    	window.location = "./blank_profile_page.html";
							    }
							  },
							  error: function(gameScore, error) {
							    // Execute any logic that should take place if the save fails.
							    // error is a Parse.Error with an error code and message.
							    alert('Failed to create new object, with error code: ' + error.message);
							  }
							});
							},
							error: function(data) {
								          var obj = jQuery.parseJSON(data);
								          alert(obj.error);
								    }
							});
					};

				  },
				  error: function(gameScore, error) {
				    // Execute any logic that should take place if the save fails.
				    // error is a Parse.Error with an error code and message.
				    alert('Failed to create new ablum, with error code: ' + error.message);
				  }
		});
    });
});