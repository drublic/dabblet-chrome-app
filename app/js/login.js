define(['jquery', 'plugins/text!tmpl/login.html'], function($, tmpl) {


	var register_user = function(user) {

		$('.outline').removeClass('error');
		$('.messages').removeClass('fade');

		// Set Username in local-storage
		if (user !== '') {
			require(['https://api.github.com/users/' + user + '?callback=define'], function(data) {
				if (data.data.message !== undefined && data.data.message === "Not Found") {

					// If user does not exist
					$('.outline').addClass('error');
					$('.messages').html('<p>Sorry, this username does not exist.</p>');
					setTimeout(function() {
						$('.messages').addClass('fade');
					}, 500);

				} else if (data.data.id !== undefined) {

					var userdata = {
						username : data.data.login,
						name : data.data.name,
						avatar : data.data.avatar_url
					};

					localStorage.setItem('github-user-data', JSON.stringify(userdata));
					require(['load-app']);
				}
			});
		}

	};


	// Propagate Dialog
	$('#container').html(tmpl);
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
