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


var user = undefined, // GitHub Username
    filetypes, // Types of files in gist
    line_data, // Translated data for template
    lines = '' // Holds all compiled lines
;


// Get Templates
var tmpl = {
  done : undefined,
  get : function(which, json, callback) {
    var template;

    $.get('tmpl/' + which + '.html', function(data) {
      template = Hogan.compile(data).render(json);
      
      if (callback !== undefined) {
        callback(template);
      }
    }, 'text');
  }

};






// Request latest Gists
+ function() {
  $.get('https://api.github.com/users/' + user + '/gists', function(data) {

    data = data.data;

    // Itterate through Gists
    for (var i = 0; i < data.length; i++) {
    
      // Itterate through files to get the types
      filetypes = [];
      for (var file in data[i].files) {
        filetypes.push(data[i].files[file].language);
      }
      
      // If no CSS or HTML-file in Gist, do next step
      if ($.inArray('CSS', filetypes) < 0 && $.inArray('HTML', filetypes) < 0) {
        continue;
      }

      // Add object with data for template
      line_data = {
        description : data[i].description,
        dabblet_url : 'http://dabblet.com/gist/' + data[i].id,
        pull_url : data[i].git_pull_url,
        created_at : function() {
          return moment(data[i].created_at).format('DD.MM.YYYY');
        },
        comments : data[i].comments
      };
      
      // Render template
      tmpl.get('user-dialog', line_data, function(data) {
        lines += data;
      });
    }
    
    // Append all lines to table
    $('#content').find('tbody').append(lines);

  }, 'jsonp');
// Check for User
+ function() {
  
  // If user is already registered
  if (localStorage.getItem('github-user-data') !== null) {
    load_app();

  // If user is not registered
  } else {
    // Propagate Dialog
    tmpl.get('user-dialog', undefined, function(data) {
      $('#container').html(data);
      $('#dialog').addClass('fade');

      $('#username').focus()
        .focusout(function() {
          register_user($(this).val());
        })
        .keypress(function(e) {
          if (e.which == 13) {
            $(this).trigger('focusout');
          }
        });
    });
  }

}();




// Hash-Listener
+ function() {
  location.hash = '';

  $(win).bind('hashchange', function() {
    var status = location.hash.replace(/#\//, '');
      log(status);
    
    if (status == "change-user") {
      localStorage.removeItem('github-user-data');
      location.reload();
    }
  
  });
}();


}(window, document, jQuery);