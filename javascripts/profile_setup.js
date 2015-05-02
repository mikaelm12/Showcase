
$(document).ready(function(){

	Parse.initialize("wS5FBQCauFezsFutdFGGMrZMgEs3XADKfTvULhMb", "jy5VORCXKwEErZvFUHMKIsvD55YEYtfYLZIpc0JD");

	var ShowcaseAlbum = Parse.Object.extend("ShowcaseAlbum");
	var query = new Parse.Query(ShowcaseAlbum);
	query.equalTo("owner", "1x2x3x4x5");
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
			var image = $("<img class='grid_image album img-responsive change_opacity img_details' src='./images/mona_lisa.jpg' id='" + album.id + "' name='" + albumName + "'>");

			if (tableCell.length == 0){
	        	console.log("CELL UNDEFINED");
	        	colDefined = false;
	        	tableCell = $("<td class='grid_cell' id='cell-" + i + "'>");
			}

			tableCell.append(albumTitle);
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

	$(document).on("click", ".album", function(){
		window.location = "./album_page.html?id=" + this.id + "&name="+ this.name;
	});
});