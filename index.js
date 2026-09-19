const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Middleware
app.use(bodyParser.json());

// Simple Rule-Based Knowledge Base
const rules = {
  "hello": "Hi! I'm a simple rule-based chatbot. How can I help you today?",
  "hi": "Hello! Welcome. What would you like to talk about?",
  "bye": "Goodbye! Have a great day! 👋",
  "how are you": "I'm doing great! Thanks for asking! 😊",
  "who created you": "I was built by a student as part of a university project!",
  "what is your name": "My name is NodeBot!",
  "default": "I'm sorry, I don't have a rule for that yet. Try saying 'hello' or 'bye'!"
};

// Routes
app.get('/', (req, res) => {
  res.send(`
    <h1>🚀 Simple Rule-Based Chatbot (Node.js)</h1>
    <p>Open your browser console and type:</p>
    <pre>
      fetch('http://localhost:3000/chat?message=hello')
    </pre>
    <p>or use the demo form below 👇</p>
  `);
});

app.get('/chat', (req, res) => {
  const { message = 'hello' } = req.query;
  const msg = message.toLowerCase().trim();

  let reply = rules.default;
  Object.keys(rules).forEach(key => {
    if (msg.includes(key)) {
      reply = rules[key];
      return false; // break
    }
  });

  res.json({ user: message, bot: reply });
});

// Simple web demo form (optional but super useful for your demo)
app.get('/demo', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>NodeBot Demo</title>
      <style>body{font-family:sans-serif;margin:20px;}</style>
    </head>
    <body>
      <h1>NodeBot Demo</h1>
      <input id="input" placeholder="Type your message..." style="padding:10px;width:300px;">
      <button onclick="send()">Send</button>
      <div id="result" style="margin-top:20px;"></div>

      <script>
        async function send() {
          const msg = document.getElementById('input').value;
          const res = await fetch('/chat?message=' + encodeURIComponent(msg));
          const data = await res.json();
          document.getElementById('result').innerHTML = 
            '<b>You:</b> ' + msg + '<br><b>NodeBot:</b> ' + data.bot;
        }
      </script>
    </body>
    </html>
  `);
});

// Start server
app.listen(3000, () => {
  console.log('✅ Chatbot running on http://localhost:3000');
  console.log('Demo: http://localhost:3000/demo');
});