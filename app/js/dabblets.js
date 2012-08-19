define(['jquery', 'plugins/text!tmpl/dabblets.html', 'helpers/hogan', 'helpers/moment'], function($, tmpl, Hogan, moment) {
	// Request latest Gists
	var user = $.parseJSON( localStorage.getItem('github-user-data') ),
			output = "",
			template, filetypes;

	require(['https://api.github.com/users/' + user.username + '/gists?callback=define'], function(data) {

		data = data.data;

		// If there's stuff to display
		if (data.length > 0) {

			// Compile the template once
			this.template = Hogan.compile(tmpl);

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
					created_at : this.moment(data[i].created_at).format('DD.MM.YYYY'),
					comments : data[i].comments
				};

				// Render template
				this.output += this.template.render(line_data);
			}

			// Append all lines to table
			$('#content').find('tbody').append(this.output);
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
