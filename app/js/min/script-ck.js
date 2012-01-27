// usage: log('inside coolFunc', this, arguments);
// paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
window.log=function(){log.history=log.history||[];log.history.push(arguments);if(this.console){arguments.callee=arguments.callee.caller;var a=[].slice.call(arguments);typeof console.log=="object"?log.apply.call(console.log,console,a):console.log.apply(console,a)}};(function(a){function b(){}for(var c="assert,clear,count,debug,dir,dirxml,error,exception,firebug,group,groupCollapsed,groupEnd,info,log,memoryProfile,memoryProfileEnd,profile,profileEnd,table,time,timeEnd,timeStamp,trace,warn".split(","),d;d=c.pop();)a[d]=a[d]||b})(function(){try{console.log();return window.console}catch(a){return window.console={}}}());+function(a,b,c,d){var e,f,g="",h={done:d,get:function(a,b,e,f){var g;c.get("tmpl/"+a+".html",function(a){g=Hogan.compile(a);f===d&&(g=g.render(b));e!==d&&e(g)},"text")}},i=function(){var a=c.parseJSON(localStorage.getItem("github-user-data"));c.get("https://api.github.com/users/"+a.username+"/gists",function(a){a=a.data;for(var b=0;b<a.length;b++){e=[];for(var d in a[b].files)e.push(a[b].files[d].language);if(c.inArray("CSS",e)<0&&c.inArray("HTML",e)<0)continue;f={description:a[b].description,dabblet_url:"http://dabblet.com/gist/"+a[b].id,pull_url:a[b].git_pull_url,created_at:moment(a[b].created_at).format("DD.MM.YYYY"),comments:a[b].comments};h.get("line",f,function(a){c("#content").find("tbody").append(a);c("#content").find("table").addClass("fade")})}},"jsonp")},j=function(){c("html").addClass("dabblet-app");h.get("dabblets",c.parseJSON(localStorage.getItem("github-user-data")),function(a){c("#container").html(a);i()})},k=function(a){c(".outline").removeClass("error");c(".messages").removeClass("fade");a!==""&&c.get("https://api.github.com/users/"+a,function(a){if(a.data.message!==d&&a.data.message==="Not Found"){c(".outline").addClass("error");c(".messages").html("<p>Sorry, this username does not exist.</p>");setTimeout(function(){c(".messages").addClass("fade")},500)}else if(a.data.id!==d){var b={username:a.data.login,name:a.data.name,avatar:a.data.avatar_url};localStorage.setItem("github-user-data",JSON.stringify(b));j()}},"jsonp")};+function(){localStorage.getItem("github-user-data")!==null?j():h.get("user-dialog",d,function(a){c("#container").html(a);c("#dialog").addClass("fade");c("#username").focus().focusout(function(){k(c(this).val())}).keypress(function(a){a.which==13&&c(this).trigger("focusout")})})}();+function(){location.hash="";c(a).bind("hashchange",function(){var a=location.hash.replace(/#\//,"");log(a);if(a=="change-user"){localStorage.removeItem("github-user-data");location.reload()}})}()}(window,document,jQuery);