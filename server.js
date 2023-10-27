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

let messagesData = [];
const filePath = './messages.json';

try {
  const fileData = fs.readFileSync(filePath, 'utf8');
  messagesData = JSON.parse(fileData);
} catch (err) {
  // Handle the error, e.g., if the file doesn't exist or is not valid JSON
  console.error('Error reading file:', err);
}

// Function to generate an incremented ID
const generateNextId = () => {
    if (messagesData.messages.length === 0) {
      return 1;
    } else {
      const lastItem = messagesData.messages[messagesData.messages.length - 1];
      return lastItem ? lastItem.id + 1 : 1; // Check if lastItem is defined
    }
  };

const messages = JSON.parse(fs.readFileSync('./messages.json', 'utf8'));
app.post("/api/login", (request, response) => {
    const username = request.body.username;
    const password = request.body.password;

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
app.get("/api/messages", (request, response) => {
    //temporarily done with a messages file, will later be replaced with a database call
    const messages = JSON.parse(fs.readFileSync('./messages.json', 'utf8'));
    const loggedInUser = request.session.username;
    response.json(messages.messages);
});
//send a message
app.post("/api/messages", (request, response) => {
    //temporarily done with a messages file, will later be replaced with a database call
    const newMessage = request.body;

    // Generate an incremented ID
    newMessage.id = generateNextId();
    newMessage.sentBy = request.session.username;
    newMessage.sentAt = new Date().toISOString;
    // Add the new data to the array
    messagesData.messages.push(newMessage);
  
    // Write the updated data back to the file
    fs.writeFileSync(filePath, JSON.stringify(messagesData, null, 2), 'utf8');
  
    response.status(201).json(newMessage); // Respond with the added data

});
//update a certain message by its ID
app.put("/api/messages/:id", (request, response) => {
const updateContent = request.body.message;
const messageIdToUpdate = request.params.id;

});

app.listen(port, () => {
	console.log(`The application successfully started on port ${port}`);
});