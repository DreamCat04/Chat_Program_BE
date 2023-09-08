const express = require('express');
const app = express();
const session = require('express-session');

app.use(express.urlencoded({'extended' : true}));

const port = 3000;

app.post("/login", (request, response) => {
	const username = request.body.username;
	const password = request.body.password;
	request.session.username = request.body.username;
	request.session.password = request.body.password;
	if(/*insert check for correct login credentials*/true) {
		authenticated = true;
		currentlyLoggedInUser = username;
		response.status(200).send('Login successful!');
	} else {
		response.status(401).send('Invalid login credentials!');
	}
});
app.get("/messages", (request, response) => {

});

app.listen(port, () => {
	console.log(`The application successfully started on port ${port}`);
});