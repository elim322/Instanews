$(document).ready(function() {
 
  //url for api request
  $("#categories").on("change", function() {

    //try appending loading.gif

    var selectedStory = $("#categories").val();
    // console.log("selectedStory");

    $(".article-boxes").empty();
    // $(".gif-loader").show();

    var url = "https://api.nytimes.com/svc/topstories/v2/" + selectedStory  +  ".json";
    url +=
      "?" +
      $.param({
        "api-key": "015e1e546b504dcab3dd3878ebbdc372"
      });

    $("button").on("click", function() {});
    //actual ajax request
    $.ajax({
      url: url,
      method: "GET"
    })
      .done(function(data) {
        //data just represents the returned object from NYT api 
        // console.log(data);
        // var formattedData = data.results;
        // console.log(data.results);
       
        var onlyImg = data.results
         .filter(function(result) {
          return result.multimedia.length; 
        })
        .slice(0, 12);
        
        // $('#gif-loader').css('display','none');
  

       $.each(onlyImg, function(key, value){
         var html = "<div class='articles' id='articles'>"
         html += "<a target= '_blank' href=" + value.url + ">"
         html += "<img class='article-image' style='background: url(" + value.multimedia[4].url + "); background-size: cover;'>"
         html += "<p class='abstract'>" + value.abstract + "</p>" + "</a>"
         html += "</div>" // adding url, images, and abstract to html 

         
        
           

      
console.log(value.multimedia[4].url);
         $(".article-boxes").append(html);
       });
       //try using $.each to loop through the data and check out the array in data called results & try appending the output to your html

      })
      .fail(function(err) {
        $alert('.article-boxes').append('<h3' + 'Sorry there was an error' + '</h3>')
      }).always(function(){
        $('#categories').click(function(){
        $('#gif-loader').css('display','block');
           });
        
// try removing or reloading the loading gif
      });
  }); // #top-stories change event

}); //end of doc ready
