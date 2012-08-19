define(['jquery', 'helpers/jquery.quicksearch'], function($) {
	$('#search').quicksearch('table tbody tr', {

		// Bind events
		'bind' : 'keydown keyup click',

		// Show files
		'show': function() {
			$(this).removeClass('hidden');
		},

		// Hide files
		'hide': function() {
			$(this).addClass('hidden');
		},

		'noResults' : 'tfoot'
	});
});