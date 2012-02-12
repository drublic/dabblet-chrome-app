define(['jquery'], function($) {
  location.hash = '';

  $(window).bind('hashchange', function() {
    var status = location.hash.replace(/#\//, '');
    
    // Change user
    if (status == "change-user") {
      localStorage.removeItem('github-user-data');
      $('header').removeClass('fade');
      $('#content').find('table').removeClass('fade');
      
      setTimeout(function() {
        location.reload();
      }, 500)
    
    
    // About page
    } else if (status == "about") {

      require(['plugins/text!tmpl/about.html'], function(tmpl) {
  
        $('#container').append(tmpl);
        
        setTimeout(function() {
          $('#dialog').addClass('fade')
            .find('.close').click(function() {
              $('#dialog').removeClass('fade');
              setTimeout(function() {
                $('#overlay').remove()
              }, 500);
            });
        }, 0);
        
        $(window).keyup(function(e) {
          if (e.which == 27) {
            $('#dialog').find('.close').trigger('click');
            location.hash = '';
          }
        });
      });

    }
  
  });
});