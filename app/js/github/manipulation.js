(function() {

	//
	// For links in the gist's sidebar
	//

	// Create element with some content
	var $dabbletLink = document.createElement('div');
		$dabbletLink.style.marginBottom = '20px';
		$dabbletLink.innerHTML = '' +
				'<div class="actor" style="background-color: #eee; border: 1px solid #ccc;">' +
					'<div class="name"><a href="http://dabblet.com/gist' + window.location.pathname + '" target="_blank">Fork this on dabblet</a></div>' +
				'</div>';

	// Owner-Tab needs some adjustments
	var $owner = document.getElementById('owner');

	if ($owner) {
		$owner.style.marginBottom = '10px';

		// Append the created element
		$owner.parentNode.insertBefore($dabbletLink, document.getElementById('parent'));
	}


	//
	// Links in the newsfeed
	//

	var i, $newsfeed, title, id,
		gists = document.querySelectorAll('.alert.gist');

	for (i = 0; i < gists.length; i++) {

		// Find the title
		title = gists[i].querySelector('.title');

		// Find the id
		id = title.querySelectorAll('a')[1].innerHTML.replace('gist: ', '');

		// Generate a new element
		$newsfeed = document.createElement('span');
		$newsfeed.innerHTML = '- <a href="http://dabblet.com/gist/' + id + '">view dabblet</a>';

		// Append new link to title
		title.appendChild($newsfeed);
	}

}());
