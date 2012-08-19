
var __ = {

	each: function (input, callback) {

		if (Object.prototype.toString.call(input) === '[object Array]') {
			input.forEach(callback);
		} else if (Object.prototype.toString.call(input) === '[object Object]') {
			var single;
			for (single in input) {
				if (input.hasOwnProperty(single)) {
					callback(single);
				}
			}
		}
	},

	render: function (template, data) {
		var field;

		if (!template) {
			return;
		}

		__.each(data, function (field) {
			template = template.replace('{{' + field + '}}', data[field]);
		});

		return template;
	}

};



if (typeof module !== "undefined") {
	module.exports = __; // CommonJS
} else if (typeof define === "function") {
	define(__); // AMD
} else {
	__ = __; // <script>
}
