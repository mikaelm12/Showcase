$(document).ready(function(){

	Parse.initialize("wS5FBQCauFezsFutdFGGMrZMgEs3XADKfTvULhMb", "jy5VORCXKwEErZvFUHMKIsvD55YEYtfYLZIpc0JD");

	var files;
	var photoGrid = $("#photoGrid");
	var index = 0;
	var rowCount = 0;
	var colCount = 0;
	
	$('#fileselect').bind("change", function(e) {
      	files = e.target.files || e.dataTransfer.files;
     });

	$(document).on("click", "#upload_button", function() {
      	
		for (var i=0; i < files.length ; i++){
			photo = files[i];
			if (!photo.type.match('image.*')) {
       			 continue;
      		}

			if (colCount != 0 && (colCount % 3 == 0)){
				rowCount++;
			}

			var fr = new FileReader();

			fr.onload = (function(theFile, i, colCount, rowCount) {
					var rowDefined = true;
					var colDefined = true;
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

			      		if (!(rowCount % 3 == 0) && !rowDefined){
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
      	

	

	// $('#save_album_button').click(function() {
 //      var serverUrl = 'https://api.parse.com/1/files/' + file.name;

 //      $.ajax({
 //        type: "POST",
 //        beforeSend: function(request) {
 //          request.setRequestHeader("X-Parse-Application-Id", 'wS5FBQCauFezsFutdFGGMrZMgEs3XADKfTvULhMb');
 //          request.setRequestHeader("X-Parse-REST-API-Key", 'PxiTZfopXT5xaT2p8rgvpuyjSA3Tgq3OnqmxPTFY');
 //          request.setRequestHeader("Content-Type", file.type);
 //        },
 //        url: serverUrl,
 //        data: file,
 //        processData: false,
 //        contentType: false,
 //        success: function(data) {
 //           // alert("File available at: " + data.url);
 //           var ShowcasePhoto = Parse.Object.extend("ShowcasePhoto");
 //    	   var photo = new ShowcasePhoto();
 //    	   photo.set("photoUrl", data.url);
 //    	   photo.save(null, {
	// 		  success: function(photo) {
	// 		    // Execute any logic that should take place after the object is saved.
	// 		    alert('New object created with objectId: ' + photo.id);
	// 		  },
	// 		  error: function(gameScore, error) {
	// 		    // Execute any logic that should take place if the save fails.
	// 		    // error is a Parse.Error with an error code and message.
	// 		    alert('Failed to create new object, with error code: ' + error.message);
	// 		  }
	// 		});

	//         },
	//         error: function(data) {
	//           var obj = jQuery.parseJSON(data);
	//           alert(obj.error);
	//         }
	//       });
 //    });

});