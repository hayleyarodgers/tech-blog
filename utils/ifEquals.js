// This file contains a helper function for creatinf a conditional if statement

module.exports = {
	ifEquals: function (var1, var2, options) {
		if (var1 === var2) {
			return options.fn(this);
		}
		return options.inverse(this);
	},
};
