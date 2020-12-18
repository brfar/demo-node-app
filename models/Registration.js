const mongoose = require('mongoose');

/** 
 * We're just defining a type and are making use of the trim helper method to remove any superfluous white space from user input. 
 */
const registrationSchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true,
	},
	email: {
		type: String,
		trim: true,
	},
});

/**
 *  We then compile a model from the Schema definition, and export it for use elsewhere in our app.
 */
module.exports = mongoose.model('Registration', registrationSchema);
