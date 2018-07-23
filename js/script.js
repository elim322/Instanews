$(document).ready(function() {
  //url for api request
  $("#categories").on("change", function() {
    $("#gif-loader").css("display", "block");
    $('.site-header').addClass("site-header-small");
    

    var selectedStory = $("#categories").val();


    $(".article-boxes").empty();


    var url =
      "https://api.nytimes.com/svc/topstories/v2/" + selectedStory + ".json";
    url +=
      "?" +
      $.param({
        "api-key": "015e1e546b504dcab3dd3878ebbdc372"
      });

    $.ajax({
      url: url,
      method: "GET"
    })
      .done(function(data) {
        var onlyImg = data.results
          .filter(function(result) {
            return result.multimedia.length;
          })
          .slice(0, 12);



        $.each(onlyImg, function(key, value) {
          var html = "<a target='_blank' href=" + value.url + ">" +
            "<div class='articles' id='articles' style='background: url(" +
            value.multimedia[4].url + 
            "); background-size: cover; background-position: 50%;'>";
          
          html += "<p class='abstract'>" + value.abstract + "</p>";
          
          html += "</div>"; 

          html += "</a>"; 
        

          $(".article-boxes").append(html);
        });
       
      })
      .fail(function(err) {
        console.log("request failed");
        $(".article-boxes").append("<h3>Sorry there was an error</h3>");
      })
      .always(function() {
        console.log("always run");
        $("#gif-loader").css("display", "none");

     
      });
  });
});//end of doc ready
