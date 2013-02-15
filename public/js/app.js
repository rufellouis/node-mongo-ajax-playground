// test ajax functon to go grab some json data from the server
//

var grabJsonData = function(params) {
    var that    = this;
    var deCache = Math.random();
    var ajaxObj = {};
    var params  = {};

    ajaxObj.dataType = 'json';
    ajaxObj.type = 'POST';
    ajaxObj.url = '/ep/grabjsondata?dc='+deCache;
    ajaxObj.data = params;

    ajaxObj.beforeSend = function(xhr, settings) {
        xhr.setRequestHeader('x-clientID', 'someUniqueID');
    };

    ajaxObj.success = function(resp) {
        window.alert('Got JSON data:' + JSON.stringify(resp));
        $('#results').html('<h2>Results:</h2><pre>ID:'+resp.id+'<br>Title: '+resp.title+'</pre>');
    };

    ajaxObj.error = function(ctx, xhr) {
        window.alert('Error on Ajax request: ');
        return;
    };

    $.ajax(ajaxObj);
}

var setup = function setup() {
    $('#c1').click(function() {
        grabJsonData();
        return 0;
    });
};

$(document).ready(function() {
    setup();
});


