function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    var streetStr = $('#street').val();
    var cityStr = $('#city').val();
    var address = streetStr + ', ' + cityStr;

    $greeting.text('So, you want to live at ' + address + '?');

    // load streetview
    var streetviewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + address + '';
    $body.append('<img class="bgimg" src="' + streetviewUrl + '">');
    console.log(streetviewUrl);
    // load nytimes  
    var nytimesUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + cityStr + '&sort=newest&api-key=fe47238bfa9b480891d6a59624521b70';               
    console.log(nytimesUrl);
    // Gets JSON file from NYtimes API
    $.getJSON( nytimesUrl, function( data ) {   
    console.log(data);
        
        //Header for NYtimes article list
        $nytHeaderElem.text('New York Times Articles About ' + cityStr);

        //For loop that goes through the list of headline articles, creates links using the headline
        // object from inside the JSON object to create the text for links. Also pulls the snippets
        //object and places below each link. 
        articles = data.response.docs;
        for (var i = 0; i < articles.length; i++) {
            var article = articles[i];
            $nytElem.append('<li class="article">'+ '<a href="'+article.web_url+'">'+article.headline.main+'</a>'+ '<p>' + article.snippet + '</p>'+ '</li>');
        };
    //If .getJson is unable to retrieve JSON file from NYtimes, show text at headline header
    }).error(function(e){
        $nytHeaderElem.text('New York Times Articles Could Not Be Loaded');
    });

    var wikiRequestTimeout = setTimeout(function() {
        $wikiElem.text("Failed to get Wikipedia resources.");
    }, 8000);
    
   //load wikipedia articles 
    var wikiUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + cityStr + '&format=json';
    console.log(wikiUrl);
    //gets json file from wiki api
    $.ajax({
        url: wikiUrl,
        dataType: "jsonp",
        //jsonp: "callback"
        success: function( response ) {
            var articleList = response[1];

            for (var i = 0; i < articleList.length; i++) {
                articleStr = articleList[i];
                var url = 'https://en.wikipedia.org/wiki/' + articleStr;
                $wikiElem.append('<li><a href="' + url + '">' + articleStr + '</a></li>');
            };

            clearTimeout(wikiRequestTimeout);
        }
    });

    return false;
};

$('#form-container').submit(loadData);
