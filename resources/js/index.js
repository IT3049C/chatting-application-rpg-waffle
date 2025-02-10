// Getting Messages:

  // Creating References:
  const myName = document.getElementById(`my-name-input`);
  const messageInput = document.getElementById(`my-message`);
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
  function fetchMessages() {
    return [
      {
        id: 1,
        text: "What's up team?",
        sender: "John M.",
        timestamp: 1537410673072
      },
      {
        id: 2,
        text: "Is this the right group chat?",
        sender: "James H.",
        timestamp: 1537410673072
      },
      {
        id: 3,
        text: "LOL How do I get out.",
        sender: "Parker V.",
        timestamp: 1537410673072
      }
    ];
  }

  // Function updateMessagesInChatBox():
  function updateMessages() {
    const messages = fetchMessages();
    let formattedMessages = "";
    messages.forEach(message => {
      formattedMessages += formatMessage(message, nameInput.value);
    });
    chatBox.innerHTML = formattedMessages;
  }
  updateMessages();


// Sending Messages:

  // Function send

  // Send Button Event Listener