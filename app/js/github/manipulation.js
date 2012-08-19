+ function(window, document, undefined) {

	// Create element with some content
	var $dabbletLink = document.createElement('div');
			$dabbletLink.style.marginBottom = '20px';
			$dabbletLink.innerHTML = '' +
				'<div class="actor" style="background-color: #eee; border: 1px solid #ccc;">' +
					'<div class="name"><a href="http://dabblet.com/gist' + window.location.pathname + '" target="_blank">Fork this on dabblet</a></div>' +
				'</div>';

	// Owner-Tab needs some adjustments
	var $owner = document.getElementById('owner');
			$owner.style.marginBottom = '10px';


	// Append the created element
	$owner.parentNode.insertBefore($dabbletLink, document.getElementById('parent'));

}(this, document);