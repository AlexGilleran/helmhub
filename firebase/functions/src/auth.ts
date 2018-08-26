
// const firebase = require("firebase-admin");
// const cookieParser = require('cookie-parser')();
// const cors = require('cors');

// // Express middleware that validates Firebase ID Tokens passed in the Authorization HTTP header.
// // The Firebase ID token needs to be passed as a Bearer token in the Authorization HTTP header like this:
// // `Authorization: Bearer <Firebase ID Token>`.
// // when decoded successfully, the ID Token content will be added as `req.user`.
// function validateFirebaseIdToken(req, res, next) {
// 	if ((!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) &&
// 		!req.cookies.__session) {
// 		console.error('No Firebase ID token was passed as a Bearer token in the Authorization header.',
// 			'Make sure you authorize your request by providing the following HTTP header:',
// 			'Authorization: Bearer <Firebase ID Token>',
// 			'or by passing a "__session" cookie.');
// 		res.status(403).send('Unauthorized');
// 		return;
// 	}

// 	let idToken;
// 	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
// 		// Read the ID Token from the Authorization header.
// 		idToken = req.headers.authorization.split('Bearer ')[1];
// 	} else {
// 		// Read the ID Token from cookie.
// 		idToken = req.cookies.__session;
// 	}
// 	firebase.auth().verifyIdToken(idToken).then(decodedIdToken => {
// 		req.user = decodedIdToken;
// 		next();
// 	}).catch(error => {
// 		console.error('Error while verifying Firebase ID token:', error);
// 		res.status(403).send('Unauthorized');
// 	});
// }

// module.exports = function setupAuth(app) {
// 	app.use(cors({ origin: true }));
// 	app.use(cookieParser);
// 	app.use(validateFirebaseIdToken);

// 	return app;
// }