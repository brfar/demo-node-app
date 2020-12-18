const express = require('express');
const mongoose = require('mongoose');
// vvv Middleware that provides useful methods for the sanitization and validation of user input.
const { check, validationResult } = require('express-validator');

const router = express.Router();
const Registration = mongoose.model('Registration');

/**
 * Telling our route to use our new template.
 * This uses the render method on Express’s response object to send the rendered view to the client.
 */
router.get('/', (req, res) => {
	res.render('form', { title: 'Registration form' });
});

const validation = [
	check('name').isLength({ min: 1 }).withMessage('Please enter a name'),
	check('email').isLength({ min: 1 }).withMessage('Please enter an email'),
];

/**
 * This is the same as the one above, except that we’re using `router.post` to respond to a different HTTP verb.
 */
router.post('/', validation, (req, res) => {
	// We can call the `validationResult` method to see if validation passed or failed.
	const errors = validationResult(req);

	/**
	 * If validation passes we can go ahead and create a new `Registration` object and attempt to save it.
	 * The database operation is asynchronous and returns a Promise, we can chain a .then() onto the end of it to deal
	 * with a successful insert and a .catch() to deal with any errors.
	 *
	 * In `else`, we’re passing the errors back to our template, so as to inform the user that something’s wrong.
	 * If validation fails, we’ll need to pass `req.body` back to the template so that any valid form inputs aren’t reset.
	 */
	if (errors.isEmpty()) {
		const registration = new Registration(req.body);
		registration
			.save()
			.then(() => res.send('Thank you for your registration!'))
			.catch(err => {
				console.log(err);
				res.send('Sorry! Something went wrong.');
			});
	} else {
		res.render('form', {
			title: 'Registration form',
			errors: errors.array(),
			data: req.body,
		});
	}

	res.render('form', { title: 'Registration form' });
});

module.exports = router;
