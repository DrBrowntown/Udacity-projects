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
    var nytimesUrl ='https://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + cityStr + '&sort=newest&api-key=fe47238bfa9b480891d6a59624521b70';               
    console.log(nytimesUrl);

    $.getJSON( nytimesUrl, function( data ) {   
    console.log(data);
        

        $nytHeaderElem.text('New York Times Articles About ' + cityStr);

        articles = data.response.docs;
        for (var i = 0; i < articles.length; i++) {
            var article = articles[i];
            $nytElem.append('<li class="article">'+ '<a href="'+article.web_url+'">'+article.headline.main+'</a>'+ '<p>' + article.snippet + '</p>'+ '</li>');
        };

    }).error(function(e){
        $nytHeaderElem.text('New York Times Articles Could Not Be Loaded');
    });
    
    
    // YOUR CODE GOES HERE! */

    return false;
};

$('#form-container').submit(loadData);
