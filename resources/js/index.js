// Getting Messages:

// Creating References:
const myName = document.getElementById(`my-name-input`);
const messageInput = document.getElementById(`my-message`); // Corrected from `myMessage`
const sendButton = document.getElementById(`send-button`);
const chatBox = document.getElementById(`chat`);

// Function formatMessage():
function formatMessage(message, myNameInput) {
  const time = new Date(message.timestamp);
  const formattedTime = `${time.getHours()}:${time.getMinutes()}`;

  if (myNameInput === message.sender) {
    return `
      <div class="mine messages">
        <div class="message">
          ${message.text}
        </div>
        <div class="sender-info">
          ${formattedTime}
        </div>
      </div>
    `;
  } else {
    return `
      <div class="yours messages">
        <div class="message">
          ${message.text}
        </div>
        <div class="sender-info">
          ${message.sender} ${formattedTime}
        </div>
      </div>
    `;
  }
}

// Function fetchMessages():
const serverURL = `https://it3049c-chat.fly.dev/messages`;

async function fetchMessages() {
  const response = await fetch(serverURL);
  return response.json();
}

// Function updateMessagesInChatBox():
async function updateMessages() {
  const messages = await fetchMessages();
  if (!Array.isArray(messages)) {
    console.error("Fetched messages are not an array", messages);
    return;
  }
  let formattedMessages = "";
  for (const message of messages) {
    formattedMessages += formatMessage(message, myName.value); // Ensure `myName` is used
  }
  chatBox.innerHTML = formattedMessages;
}

const MILLISECONDS_IN_TEN_SECONDS = 10000;
setInterval(updateMessages, MILLISECONDS_IN_TEN_SECONDS);

// Sending Messages:

// Send Function
function sendMessages(username, text) {
  const newMessage = {
    sender: username,
    text: text,
    timestamp: new Date()
  };

  fetch(serverURL, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newMessage)
  });
}

// Send Button Event Listener
sendButton.addEventListener("click", function(event) {
  event.preventDefault();
  const sender = myName.value;
  const message = messageInput.value;
  sendMessages(sender, message);
  messageInput.value = "";
});

// Initial update
updateMessages();