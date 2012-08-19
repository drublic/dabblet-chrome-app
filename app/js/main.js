require(['jquery', 'hashlistener'], function($) {


	// If user is already registered
	if (localStorage.getItem('github-user-data') !== null) {
		require(['load-app']);

	// If user is not registered
	} else {
		require(['login']);
	}

});
