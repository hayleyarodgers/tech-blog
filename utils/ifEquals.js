/* This file contains a helper function for creating a conditional if statement used to see if current user is the one who wrote the post */

module.exports = {
	ifEquals: function (var1, var2, options) {
		if (var1 === var2) {
			return options.fn(this);
		}
		return options.inverse(this);
	},
};
