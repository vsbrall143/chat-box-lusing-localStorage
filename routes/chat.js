const express =require('express');
const fs = require('fs');

const router= express.Router();

// Function to append text to message.txt
const appendToMessageFile = (text,req) => {
  const {username}=req.body;
  const message = `${username}: ${text}\n`;
  fs.appendFileSync('message.txt', message, (err) => {
    if (err) {
      console.error('Error appending to message.txt:', err);
    }
  });
};
const readMessageFile = () => {
  try {
    const data = fs.readFileSync('message.txt', 'utf8');
    return data;
  } catch (err) {
    console.error('Error reading message.txt:', err);
    return '';
  }
};

 

// Chat route (GET) - Sends chat form and message content
router.get("/chat", (req, res, next) => {
    const messageContent = readMessageFile();
    const formattedMessageContent = messageContent.replace(/\n/g, '<br>');

    res.send(`
      <form action="/chat" method="POST" id=loginForm>
        <input type="text" name="chat_box" id="chat_box" placeholder="Type your message here">
        <input type="hidden" name="username" id="username">
        <button type="submit" onClick="handleSubmit()">Send</button>
      </form>

       <div>${formattedMessageContent}</div> <!-- Use formatted content here -->
       
          <script>
            function handleSubmit(){
              document.getElementById('username').value=localStorage.getItem("username"); // Get the value of the input field
            }
          </script>
    `);
  });
  
  // Chat route (POST) - Handles chat message and redirects
  router.post("/chat", (req, res, next) => {
    const { chat_box } = req.body;
    const {username}=req.body;
    console.log(req.body);
    if(chat_box)
    {
      appendToMessageFile(chat_box,req);
    }
 
    res.redirect("/chat");
  });
  
module.exports=router;