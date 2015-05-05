findMatchingUsers = function(){
	var query = new Parse.Query(Parse.User);
	
	query.find({
	success: function(users) {
    	
    	var userFullNames = []
    	for (var i = users.length - 1; i >= 0; i--) {
    		
    		var currentUser = users[i]
    		var user_full_name = currentUser.attributes.first_name + " " + currentUser.attributes.last_name;
    		userFullNames.push(user_full_name);
    		
    	};
        
    	//autocomplete widjet
        $("#artistSearchBar").autocomplete({
          autoFocus: true,
          source: userFullNames,
          minLength: 1,
          select: function(event,ui){
            var inputValue = ui.item.value;
            //console.log(inputValue);
            $("#artistSearchBar").val(inputValue);
            //I reuse this code because javascript compilation/execution was a problem...needs to be inside the function
            event.preventDefault();
          }
         });
		}
	});
	
}

$(document).on("click", ".searchButton", function(){
  var searchParam = $("#artistSearchBar").val() 
  var queryParam = "?name=" + searchParam 
  $("#artistSearchBar").val("");
  window.location = "./search_results.html" + queryParam;
});

$(document).on("keyup", "#artistSearchBar", function(){
  if (event.keyCode == 13){
    var searchParam = $("#artistSearchBar").val() 
    var queryParam = "?name=" + searchParam 
    $("#artistSearchBar").val("");
    window.location = "./search_results.html" + queryParam;
  }    
});


findMatchedUsersOnParseUpdateTable = function(prefix){

    var query = new Parse.Query(Parse.User);
    query.startsWith("full_name", prefix); // find all users whose name start with
    query.find({
    success: function(usersWithPrefix) {
    // Do stuff
        console.log("The matched Users");
        console.log(usersWithPrefix);
        $("#artistSearchResults tr").remove();
        var table = document.getElementById("artistSearchResults");
        for (var i = usersWithPrefix.length - 1; i >= 0; i--) {
            var currentUser = usersWithPrefix[i];
       


            var newArtistRow = table.insertRow(0);
            var artistInfoCell = newArtistRow.insertCell(0);
            var artistNamecell = newArtistRow.insertCell(0); 
            artistNamecell.innerHTML = "<strong><a class='userName' id='" + currentUser.id + "'>"+currentUser.attributes.full_name+ "</a></strong>"
            if(currentUser.attributes.bio){
                artistInfoCell.innerHTML = currentUser.attributes.bio;

            } else {
                artistInfoCell.innerHTML = "No Artist Description"
            }
            


         };
 
        }

    });

}


function getParameterByName( name,href )
{
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( href );
  if( results == null )
    return "";
  else
    return decodeURIComponent(results[1].replace(/\+/g, " "));
}

$(document).on("click", ".userName", function(){
    window.location = "./profile_other.html?id=" + this.id;
});