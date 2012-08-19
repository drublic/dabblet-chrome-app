
var __ = {};

__.render = function (template, data) {
	var field;

	if (!template) {
		return;
	}

	for (field in data) {
		if (data.hasOwnProperty(field)) {
			template = template.replace('{{' + field + '}}', data[field]);
		}
	}

	return template;
};

if (typeof module !== "undefined") {
	module.exports = __; // CommonJS
} else if (typeof define === "function") {
	define(__); // AMD
} else {
	__ = __; // <script>
}
