define(['jquery', 'plugins/text!tmpl/app.html', 'plugins/logan'], function($, tmpl, __) {

	$('html').addClass('dabblet-app');

	var template = __.render(tmpl, $.parseJSON(localStorage.getItem('github-user-data')));

	$('#container').html(template);
	$('header').addClass('fade');

	require(['dabblets']);
});
