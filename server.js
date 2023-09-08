const express = require('express');
const fs = require('fs');
const app = express();
const session = require('express-session');

app.use(express.json());
app.use(express.urlencoded({'extended' : true}));
app.use(session({
	secret:'HGuiht&78zuiHhfRTzuihhgfgRTR76(zUIGFcr67TZU',
	resave:false,
	saveUninitialized:true,
	cookie:{
		maxAge: 24 * 60 * 60 * 1000,
		secure: false
	}
}));

const port = 5000;

app.post("/login", (request, response) => {
    const username = request.body.username;
    const password = request.body.password;
    console.log('Received username:', username);
    console.log('Received password:', password);
    
  // Read the users from the users.json file
  const usersData = JSON.parse(fs.readFileSync('./users.json', 'utf8'));
  const users = usersData.users;

  // Check if the provided credentials match any user in the users.json file
  const foundUser = users.find((user) => {
    return user.username === username && user.password === password;
  });

  if (foundUser) {
    // Authentication successful
    request.session.username = username;
    request.session.password = password;
    response.status(200).send('Login successful!');
  } else {
    // Authentication failed
    response.status(401).send('Invalid login credentials!');
  }
});
app.get("/messages", (request, response) => {

});

app.listen(port, () => {
	console.log(`The application successfully started on port ${port}`);
});