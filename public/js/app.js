// Demonstrate a simple ajax functon that will make an API request
// to our server and display the returned data in a placeholder div
// already present in the index.html file used to laod this js.
//


// As always there are many different ways to structure code. I like to
// have separate functions as much as is practicable. Many people will
// write this exact same example using inline functions and object definitions.
//
// That's fine so long as you don't mind having rats nest mega indented code :)


// Overview:
//
// Simply puy Ajax is a way to make an HTTP call from a browser without having
// to reload the entire page you are already looking at.
//
// There are many reasons why you might want to do this but they mostly boil
// down to two things:
//
// - speed
// - user experience
//
// Faster equals better. Web sites can also produce more eye catching displays 
// if they only have to update a small part of the page not reload the entire thing.
//
// Jquery and other quality javascript client side libraries abstract away a lot
// of the hard work involved in setting up an ajax request. For a detailed 
// look at raw ajax http://www.w3schools.com/ajax/default.asp
//
// Jqery Ajax:
//
// A jquery style ajax request is triggered by the $.ajax function.
//
// $.ajax takes a single object {} as a parameter. To setup an ajax call
// simply create a settings object (as we will do below) pass it to the $.ajax
// function. That's it.
//
// Jquery provides defaults for almost all of the many options available to 
// control an ajax call. I like to override a key few as experience has tought me 
// that the defaults only work about 90% of the time. It's so easy and quick to
// detail exactly what you want that it's not worth the 10% time it will not
// work on full auto.
//
// The setup below is what I consider to be the bare minimum to specify and as
// you can see it is easy to wrap all this into a function that just takes 
// a target URL, optional data then configures and executes the ajax call.
//
// There really is no reason to keep repeating all this stuff throughout the 
// coe base - does not stop some folks though...


var grabJsonData = function(params) {
    // cache the value of 'this' for use inside
    //   callback function scope if needed
    var that    = this;

    // random number to be appended to each API call in
    // order to force certain stubborn cache systems to
    // make a full new request to the server
    var deCache = Math.random();

    // simple object that will hold the definition of aour ajax call
    var ajaxObj = {};

    // empty object that could be used to pass extra parameters to the 
    // ajax call - not used in this example
    var params  = {};

    // start to fill in the ajax call definition

    // set the type of data expected back from the server
    // jquery will try and guess but it gets it wrong sometimes
    // better to always set this explicitly assuming we know 
    // what tyoe it will always be
    // NOTE! get this wrong and strange wonderful things will happen.
    ajaxObj.dataType = 'json';

    // set the type of http request to make (GET or POST)
    ajaxObj.type = 'POST';

    // set the url of the ajax http call
    // note the deCache on the end (you can omit this most times)
    ajaxObj.url = '/ep/grabjsondata?dc='+deCache;

    // set any optional data to send (none in this example)
    ajaxObj.data = params;

    // setup any functions to be called before the request is made
    // this allows for setting of custom headers etc. as in this example.
    // return FALSE from this function will cancel the ajax request.
    // see http://api.jquery.com/jQuery.ajax/#jqXHR for full xhr reference
    // settings is our ajaxObj as is ar call time.
    ajaxObj.beforeSend = function(xhr, settings) {
        xhr.setRequestHeader('x-clientID', 'someUniqueID');
    };

    // setup function to be called if ajax request succeeds. 
    // Technically the success function gets passed three parameters
    //   resp - data from the server formatted according to dataType (JSON here)
    //   requestStatus - string representing the request status
    //   xhr - the jquery xhr object (http://api.jquery.com/jQuery.ajax/#jqXHR)
    //
    // Most of the time you will only care about the resp (data sent from the server)
    //
    // This example function first displays the resp in an alert dialog and then
    // inserts a formatted version of the data into the placeholder div we already
    // have in the index.html for this example.
    ajaxObj.success = function(resp) {
        window.alert('Got JSON data:' + JSON.stringify(resp));
        $('#results').html('<h2>Results:</h2><pre>ID:'+resp.id+'<br>Title: '+resp.title+'</pre>');
    };

    // set the function to be called if the ajax request failed.
    // NOTE! This is *not* called just because our server sent back an application
    // specific error - {result:'user not logged in'} for example.
    //
    // For an ajax request to be failed it means a 404 from the server, timeout,
    // parse error on the data (not in JSON format in this case) and so on.
    //
    ajaxObj.error = function(ctx, xhr) {
        window.alert('Error on Ajax request: ');
        return;
    };

    // Make the ajax call passing the ajaxObj we just filled out above as the
    // control / definition / settings (you will see it called all three in places)
    $.ajax(ajaxObj);
}

// This is a vry simple function to attach a click handler to our 'button' div 
// in the index.html and run the ajax setup and call function (above) when 
// the click event is fired on that div.
//
// In a real world example you would normally use a fromwork for the jquery / js
// GUI work and so the setup function here would just initialize said framework.
var setup = function setup() {
    $('#c1').click(function() {
        grabJsonData();
        return 0;
    });
};

// Use the built in jquery function to detect when the document (our index.html) 
// has finished loading. When it has we call our very basic setup function above.
//
// Many people will inline the setup function - I usually do not - easier to read.
$(document).ready(function() {
    setup();
});


