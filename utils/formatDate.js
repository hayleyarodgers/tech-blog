/* This file contains a helper function for changing the format of a date in the database */

module.exports = {
	format_date: (date) => {
		// Format date as MM/DD/YYYY
		return date.toLocaleDateString();
	},
};
