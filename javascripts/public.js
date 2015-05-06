$(document).ready(function(){
      Parse.initialize("d2fQK58HUnwBBqhiIOOXLkXiP84UmGyut4RRqazH", "VjZOZZqGxX1ZlavV2mMsirKcChshCshKn6X39qVf");
      var currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (!currentUser){
          var profileButton = $(".home_button");
          profileButton.removeClass("home_button");
          profileButton.html("Log In");
          profileButton.attr("data-toggle", "modal");
          profileButton.attr("data-target", "#myModal");
          var logoutButton = $(".logout_button");
          logoutButton.removeClass("logout_button");
          logoutButton.html("Register");
          logoutButton.attr("data-toggle", "modal");
          logoutButton.attr("data-target", "#loginModal");
      }

      findMatchingUsers();

      var userPrefixFromURL = getParameterByName( "name", document.URL);
      findMatchedUsersOnParseUpdateTable(userPrefixFromURL);
      
      $(document).on("click", ".searchButton", function(){
        var searchParam = $("#artistSearchBar").val();
        var queryParam = "?name=" + searchParam;
        $("#artistSearchBar").val("");
        window.location = "./search_results.html" + queryParam;
      });

      // $("#artistSearchBar").keyup(function(event){
      //       console.log("HERE");
      //       if (event.keyCode == 13){
      //           var searchParam = $("#artistSearchBar").val();
      //           var queryParam = "?name=" + searchParam;
      //           $("#artistSearchBar").val("");
      //           window.location = "./search_results.html" + queryParam;
      //       }    
      // });    
});


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
          }).keyup(function(e){
              if (e.keyCode == 13){
                  var searchParam = $("#artistSearchBar").val();
                  var queryParam = "?name=" + searchParam;
                  $("#artistSearchBar").val("");
                  window.location = "./search_results.html" + queryParam;
              } 
          });
      }
    });
}

findMatchedUsersOnParseUpdateTable = function(prefix){

    var query = new Parse.Query(Parse.User);
    query.startsWith("full_name", prefix); // find all users whose name start with
    query.find({
    success: function(usersWithPrefix) {
    // Do stuff
        
        $("#artistSearchResults tr").remove();
        //var search_results = document.getElementById("artistSearchResults");
        if (usersWithPrefix.length == 0){
            $("#artistSearchResults").append("<strong>No artists matched your search!</strong>");
            return;
        };

        for (var i = usersWithPrefix.length - 1; i >= 0; i--) {
            var currentUser = usersWithPrefix[i];
            var picture = usersWithPrefix[i].get('profile_picture');
            var id = usersWithPrefix[i].id;
            //console.log(name);
            //console.log(id);
            var fullname = usersWithPrefix[i].get('full_name');
            var bio = usersWithPrefix[i].get('bio');
            if(currentUser.attributes.bio){
                bio = currentUser.attributes.bio;

            } else {
                bio = "No artist description.";
            }

            $("#artistSearchResults").append("<a href ="+ "./profile_other.html?id=" + id + ">" + "<div class = 'caption'> " + "<img  class='border trending' id='pic" + String(i) + "' src='" + String(picture) + "'/>" + "<div class = 'caption_overlay'>" + "<p class = 'caption_overlay_title'>" + String(fullname) + "</p>" + "<p class = 'caption_overlay_content'>" + String(bio) + "</p></div>"+ "</div>" + "</a>");
            //var artistPic = newArtistRow.insertCell(0);

            //var artistInfoCell = newArtistRow.insertCell(1);
            //var artistNamecell = newArtistRow.insertCell(2); 
            //artistNamecell.innerHTML = "<strong><a class='userName' id='" + currentUser.id + "'>"+currentUser.attributes.full_name+ "</a></strong>"
            //artistPic.innerHTML = "<div id ='trending_container'><a href ="+ "./profile_other.html?id=" + id + ">" + "<div class = 'caption'> " + "<img  class='border trending' id='pic" + String(i) + "' src='" + String(picture) + "'/>" + "<div class = 'caption_overlay'>" + "<p class = 'caption_overlay_title'>" + String(fullname) + "</p>" + "<p class = 'caption_overlay_content'>" + String(bio) + "</p></div>"+ "</div>" + "</a></div>";

         }
        },
        error: function(error){
            $("#artistSearchResults").append("<strong>No artists matched your search!</strong>");
        }
    });
}


function getParameterByName( name,href ){
      name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
      var regexS = "[\\?&]"+name+"=([^&#]*)";
      var regex = new RegExp( regexS );
      var results = regex.exec( href );
      if( results == null )
        return "";
      else
        return decodeURIComponent(results[1].replace(/\+/g, " "));
};

