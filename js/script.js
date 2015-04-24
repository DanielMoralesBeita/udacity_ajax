function loadData() {
    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview    
    //get the street address and city input in variables:
    var street = $('#street').val();
    var city = $('#city').val();
    var address = street +", "+ city; 
    console.log(address);
    var url = "https://maps.googleapis.com/maps/api/streetview?size=400x400&location="+ street +", "+city;
    console.log(url);
    
    $body.append('<img class = "bgimg" src="' + url +'">');    
    var Nurl = "http://api.nytimes.com/svc/search/v2/articlesearch.json?q="+ city +"&sort=newest&&api-key=10423910dc1ba3e9699af8846b3d6ef9:18:71939341"
    //newyork times AJAX request
    
    $.getJSON(Nurl, function(data)
	      {
		  console.log(data);
		  $nytHeaderElem.text('New York Times about '+ address);
		  articles = data.response.docs;
		  for (var i=0; i < articles.length; i++)
		  {
		      var article = articles[i];
		      $nytElem.append('<li class="article">' + 
				      '<a href="' + article.web_url + '" ><h2>'+ article.headline.main + '</h2></a>' + 
				      '<p>' + article.snippet + '</p>' + 
				      '</li>');
		  };

		  /*
		  var items = [];
		  $.each( data, function( key, val ) {
		      items.push( "<li id='" + key + "'>" + val + "</li>" );
		  });
		  $( "<ul/>", {
		      "class": "my-new-list",
		      html: items.join( "" )
		  }).appendTo( "body" );
		  */		  
	      })
    
    return false;
};

$('#form-container').submit(loadData);

// loadData();
// url ave, city

//new york times api:
//api :   10423910dc1ba3e9699af8846b3d6ef9:18:71939341
 //10423910dc1ba3e9699af8846b3d6ef9:18:71939341

/*
$.getJSON(); // to get json requests.
jQuery.JSON();

url structure
http://api.nytimes.com/svc/search/v2/articlesearch.response-format?[q=search term&fq=filter-field:(filter-term)&additional-params=values]&api-key=####
*/