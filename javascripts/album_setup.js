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

			if (tableCell.length == 0){
	        	console.log("CELL UNDEFINED");
	        	colDefined = false;
	        	tableCell = $("<td class='grid_cell' id='cell-" + i + "'>");
			}

			tableCell.append(photoTitle);
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
      			photoGrid.append(tableRow);
			}

			colCount++;
	      
	    }
	  },
	  error: function(error) {
	    alert("Error: " + error.code + " " + error.message);
	  }
	});
});