define(['jquery', 'plugins/text!tmpl/dabblets.html', 'plugins/logan', 'helpers/moment'], function($, template, __, moment) {
	// Request latest Gists
	var user = $.parseJSON( localStorage.getItem('github-user-data') );

	require(['https://api.github.com/users/' + user.username + '/gists?callback=define'], function (data) {
		var filetypes, line_data,
			output = "";

		gists = data.data;

		// If there's stuff to display
		if (gists.length > 0) {

			// Itterate through Gists
			__.each(gists, function (gist) {

				// Itterate through files to get the types
				filetypes = [];
				__.each(gist.files, function (file) {
					filetypes.push(gist.files[file].language.toLowerCase());
				});

				// If no CSS or HTML-file in Gist, do next step
				if ($.inArray('css', filetypes) < 0 && $.inArray('html', filetypes) < 0) {
					return false;
				}

				// Add object with data for template
				line_data = {
					description:   gist.description,
					dabblet_url:   'http://dabblet.com/gist/' + gist.id,
					html_url:      gist.html_url,
					pull_url:      gist.git_pull_url,
					created_at:    this.moment(gist.created_at).format('DD.MM.YYYY'),
					comments:      gist.comments
				};

				// Render template
				output += __.render(template, line_data);
			});

			// Append all lines to table
			$('#content').find('tbody').append(output);
			$('#content').find('table').addClass('fade');
			$('#loading').fadeOut(function() {
				$(this).remove();
				require(['search']);
			});

		// If there's nothing to display
		} else {
			$('#content')
				.find('table').addClass('fade')
				.find('tfoot').removeClass('hidden');
			$('#loading').fadeOut(function() {
				$(this).remove();
			});
		}

	});
});
