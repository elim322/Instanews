$(document).ready(function() {
  //url for api request
  $(".categories").on("change", function() {
    $(".gif-loader").css("display", "block");
    $(".site-header").addClass("site-header-small");

    let selectedStory = $(".categories").val();

    $(".article-boxes").empty();

    let url =
      "https://api.nytimes.com/svc/topstories/v2/" + selectedStory + ".json";
    url +=
      "?" +
      $.param({
        "api-key": "2aTZRizE8iYuvPDWWtDTr8GdsxmtDDsM"
      });

    $.ajax({
      //ajax request
      url: url,
      method: "GET"
    })
      .done(function(data) {
        //filter results for images only
        let onlyImg = data.results
          .filter(function(result) {
            return result.multimedia.length;
          })
          .slice(0, 12);

        $.each(onlyImg, function(key, value) {
          //loop for pictures + articles
          let html =
            "<a target='_blank' href=" +
            value.url +
            ">" +
            "<div class='articles' id='articles' style='background: url(" +
            value.multimedia[4].url +
            "); background-size: cover; background-position: center;'>";

          html += "<p class='abstract'>" + value.abstract + "</p>";

          html += "</div>";

          html += "</a>";

          $(".article-boxes").append(html);
          //adding additional CSS
          $("footer").addClass("footer-desktop");
          $("body").addClass("body-results");
        });
      })
      .fail(function(err) {
        //error notification for failing to load
        console.log("request failed");
        $(".article-boxes").append("<h3>Sorry there was an error</h3>");
      })
      .always(function() {
        //always run gif loader whilst loading pictures
        console.log("always run");
        $(".gif-loader").css("display", "none");
      });
  });
}); //end of doc ready
