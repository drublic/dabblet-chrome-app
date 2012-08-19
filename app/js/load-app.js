define(['jquery', 'plugins/text!tmpl/app.html', 'helpers/hogan'], function($, tmpl, Hogan) {
	$('html').addClass('dabblet-app');

	var template = Hogan.compile(tmpl).render($.parseJSON(localStorage.getItem('github-user-data')));

	$('#container').html(template);
	$('header').addClass('fade');

	require(['dabblets']);
});