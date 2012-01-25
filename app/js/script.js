// usage: log('inside coolFunc', this, arguments);
// paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
window.log = function(){
  log.history = log.history || [];   // store logs to an array for reference
  log.history.push(arguments);
  if(this.console) {
    arguments.callee = arguments.callee.caller;
    var newarr = [].slice.call(arguments);
    (typeof console.log === 'object' ? log.apply.call(console.log, console, newarr) : console.log.apply(console, newarr));
  }
};

// make it safe to use console.log always
(function(b){function c(){}for(var d="assert,clear,count,debug,dir,dirxml,error,exception,firebug,group,groupCollapsed,groupEnd,info,log,memoryProfile,memoryProfileEnd,profile,profileEnd,table,time,timeEnd,timeStamp,trace,warn".split(","),a;a=d.pop();){b[a]=b[a]||c}})((function(){try
{console.log();return window.console;}catch(err){return window.console={};}})());





+ function(win, doc, $, undefined) {


var tmpl = {}, // Holds templates
    line_data, // Translated data for template
    lines = '' // Holds all compiled lines
;


// Get Template for Dabblets
+ function() {
  
  $.get('tmpl/line.html', function(data) {
    tmpl.line = Hogan.compile(data);
  }, 'text');

}();


// Request latest Gists
+ function() {
  $.get('https://api.github.com/users/drublic/gists', function(data) {

    // Itterate through Gists
    for (var i = 0; i < data.data.length; i++) {

      // Add object with data for template
      line_data = {
        description : data.data[i].description,
        dabblet_url : 'http://dabblet.com/gist/' + data.data[i].id,
        pull_url : data.data[i].git_pull_url,
        created_at : function() {
          return moment(data.data[i].created_at).format('DD.MM.YYYY');
        },
        comments : data.data[i].comments
      };
      
      // Render template
      lines += tmpl.line.render(line_data);
    }
    
    // Append all lines to table
    $('tbody').append(lines);

  }, 'jsonp');
}();


}(window, document, jQuery);