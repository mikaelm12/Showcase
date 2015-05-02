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

	Parse.initialize("wS5FBQCauFezsFutdFGGMrZMgEs3XADKfTvULhMb", "jy5VORCXKwEErZvFUHMKIsvD55YEYtfYLZIpc0JD");
	$("#album_name_input").html(unescape($.getUrlVar('name')));
	var album_id = $.getUrlVar('id');
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
			if (photoTitle == ""){
				photoTitle = "No Title";
			}
			var photoTitle = $("<h2 class='photoTitle'>" + photoTitle + "</h2>");
			var image = $("<img class='grid_image' src='" + photo.get("photoUrl") + "'>");
			var removeButton = $("<div class='input-group-btn'><button type='submit' class='btn btn-sm btn-default remove' id='" + photo.id + "'><span class='glyphicon glyphicon-remove' aria-hidden='true'></span></button></div>");
			var titleField = $("<div class='input-group'></div>");
			titleField.append(photoTitle);
			titleField.append(removeButton);
			var photoDesc = $("<p class='desc'>" + "<b>Description</b>: " + photo.get('description') + '</p>');

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
	

    $(document).on("click", ".remove", function(){
    	console.log("HERE REMOVE");
	    $("#deletePhotoButton").attr("photo_id", this.id);
	    $("#myDelete").modal("show");
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
});