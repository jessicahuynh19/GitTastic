$(document).ready(function() {

    var topics = ["Captain America", "Iron Man", "Hulk", "Thor", "Black Widow", "Black Panther", "Ant Man", "Doctor Strange", "Vision", "Wasp"]
    const theme = new Audio("assets/Approaching Nirvana - The Avengers Theme Remix.mp3");
    var musicPlaying = false;
    var results;

    var giphyURL = "http://api.giphy.com/v1/gifs/trending?api_key=wCXTHyvuelYKr967zgQIgFiyi7riI8hE";
    
        $("#title-button").on("click", function() {
            if(musicPlaying == false){
                theme.play();
                musicPlaying = true;
               }else {
                theme.pause();
                musicPlaying = false;
            }
        });
    
    
        function makeButtons() {
    
            $("#aven-buttons").empty();
    
            for (i = 0; i < topics.length; i++) {
                
                var b = $("<button>");
    
                b.addClass("character-btn");
                b.attr("data-name", topics[i]);
                b.text(topics[i]);
    
                $("#aven-buttons").append(b);
            };
        };
    
        $("#add-character").on("click", function(event) {
    
            event.preventDefault();
    
            var character = $("#aven-input").val().trim();
    
            topics.push(character);
            $("#aven-input").val("");
    
            makeButtons();
    
            console.log(topics);
        });
    
        makeButtons();
    
        
    
          function dataPull() {
    
             var characterName = $(this).attr("data-name");
             var characterStr = characterName.split(" ").join("+");
            var giphyURL = "https://api.giphy.com/v1/gifs/search?q=" + characterStr + "&api_key=wCXTHyvuelYKr967zgQIgFiyi7riI8hE";
    
             $.ajax({
            url: giphyURL,
            method: "GET"
          }).done(function(response) {
            
            console.log(giphyURL);
            console.log(response);
    
            results = response.data;
    
            $("#gifs").empty();
            for (var i = 0; i < results.length; i++) {
                
                var characterDiv = $("<div>");
                var para = $("<p class='rating'>").text("Rating: " + results[i].rating);
                var characterImage = $("<img>");
    
                para.addClass("rating-text")
                
              characterImage.addClass("image-gifs")
                characterImage.attr("src", results[i].images.fixed_height_still.url);
                characterImage.attr("data-state", "still");
              characterImage.attr("data-position", i);
    
                characterDiv.append(para);
              characterDiv.append(characterImage);
              characterDiv.addClass("individual-gifs")
    
              $("#gifs").prepend(characterDiv);
    
            }; 
          }); 
      
        };
    
      
    
        $(document).on("click", ".character-btn", dataPull);
    
        
    
        function gifAnimation() {
          var state = $(this).attr("data-state");
          var position = $(this).attr("data-position"); 
          position = parseInt(position); 
    
          console.log(results[position].images.fixed_height.url);
          console.log(position);
    
          if (state === "still") {
            console.log("we're here");
            $(this).attr("src", results[position].images.fixed_height.url);
            $(this).attr("data-state", "animate");
          } else {
            $(this).attr("src", results[position].images.fixed_height_still.url);
            $(this).attr("data-state", "still");
          }
        };
    
      $(document).on("click", ".image-gifs", gifAnimation);
    
    }); 
    