(function () {

# /*

# AI-CS LIVE CHAT WIDGET

*/

const script =
document.currentScript;

const companyId =
script &&
script.dataset.companyId
? script.dataset.companyId
: "";

const customerId =
script &&
script.dataset.customerId
? script.dataset.customerId
: "";

if (!companyId || !customerId) {

```
console.error(
  "AI-CS: companyId dan customerId wajib diisi."
);

return;
```

}

# /*

# STYLE

*/

const style =
document.createElement("style");

style.textContent = `

```
#aics-button {
  position: fixed;
  right: 20px;
  bottom: 20px;
  width: 60px;
  height: 60px;
  border: none;
  border-radius: 50%;
  background: #111827;
  color: white;
  font-size: 25px;
  cursor: pointer;
  z-index: 999999;
  box-shadow: 0 4px 15px rgba(0,0,0,0.25);
}

#aics-window {
  display: none;
  position: fixed;
  right: 20px;
  bottom: 90px;
  width: 360px;
  height: 500px;
  background: white;
  border-radius: 15px;
  box-shadow: 0 5px 25px rgba(0,0,0,0.25);
  overflow: hidden;
  z-index: 999999;
  font-family: Arial, sans-serif;
}

#aics-header {
  background: #111827;
  color: white;
  padding: 15px;
}

#aics-header-title {
  font-weight: bold;
  font-size: 16px;
}

#aics-header-status {
  margin-top: 4px;
  font-size: 12px;
  color: #d1d5db;
}

#aics-messages {
  height: 390px;
  padding: 15px;
  overflow-y: auto;
  background: #f4f6f8;
}

.aics-message {
  max-width: 82%;
  padding: 10px 12px;
  margin-bottom: 10px;
  border-radius: 10px;
  font-size: 14px;
  line-height: 1.4;
}

.aics-ai {
  background: #e5e7eb;
  color: #111827;
}

.aics-user {
  background: #111827;
  color: white;
  margin-left: auto;
}

#aics-input-area {
  display: flex;
  gap: 6px;
  padding: 10px;
  border-top: 1px solid #ddd;
  background: white;
}

#aics-input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  outline: none;
}

#aics-send {
  border: none;
  padding: 10px 14px;
  border-radius: 8px;
  background: #111827;
  color: white;
  cursor: pointer;
}

#aics-send:disabled {
  opacity: 0.5;
}

@media (max-width: 500px) {

  #aics-window {
    right: 10px;
    bottom: 80px;
    width: calc(100% - 20px);
    height: 70vh;
  }

  #aics-messages {
    height: calc(70vh - 110px);
  }

}
```

`;

document.head.appendChild(style);

# /*

# BUTTON

*/

const button =
document.createElement("button");

button.id =
"aics-button";

button.textContent =
"💬";

document.body.appendChild(button);

# /*

# CHAT WINDOW

*/

const chat =
document.createElement("div");

chat.id =
"aics-window";

chat.innerHTML = `

```
<div id="aics-header">

  <div id="aics-header-title">
    AI Customer Service
  </div>

  <div id="aics-header-status">
    ● Online
  </div>

</div>

<div id="aics-messages">

  <div class="aics-message aics-ai">
    Halo, ada yang bisa saya bantu?
  </div>

</div>

<div id="aics-input-area">

  <input
    id="aics-input"
    type="text"
    placeholder="Tulis pesan..."
    autocomplete="off"
  >

  <button id="aics-send">
    Kirim
  </button>

</div>
```

`;

document.body.appendChild(chat);

# /*

# OPEN / CLOSE

*/

button.addEventListener(
"click",
function () {

```
  if (
    chat.style.display === "block"
  ) {

    chat.style.display =
      "none";

  } else {

    chat.style.display =
      "block";

    document
      .getElementById("aics-input")
      .focus();

  }

}
```

);

# /*

# ADD MESSAGE

*/

function addMessage(
text,
type
) {

```
const messages =
  document.getElementById(
    "aics-messages"
  );

const message =
  document.createElement("div");

message.className =
  "aics-message " +
  (
    type === "user"
      ? "aics-user"
      : "aics-ai"
  );

message.textContent =
  text;

messages.appendChild(
  message
);

messages.scrollTop =
  messages.scrollHeight;
```

}

# /*

# SEND MESSAGE

*/

async function sendMessage() {

```
const input =
  document.getElementById(
    "aics-input"
  );

const send =
  document.getElementById(
    "aics-send"
  );

const message =
  input.value.trim();

if (!message) {
  return;
}


addMessage(
  message,
  "user"
);

input.value = "";

send.disabled = true;


try {

  const response =
    await fetch(
      "https://ai-cs-new.onrender.com/api/chat",
      {
        method: "POST",

        credentials: "include",

        headers: {
          "Content-Type":
            "application/json"
        },

        body:
          JSON.stringify({
            message:
              message,

            companyId:
              companyId,

            customerId:
              customerId
          })
      }
    );


  const data =
    await response.json();


  addMessage(
    data.reply ||
    data.message ||
    "AI tidak memberikan jawaban.",
    "ai"
  );


} catch (error) {

  console.error(
    "AI-CS WIDGET ERROR:",
    error
  );

  addMessage(
    "Tidak dapat terhubung ke AI Customer Service.",
    "ai"
  );

} finally {

  send.disabled =
    false;

  input.focus();

}
```

}

# /*

# SEND BUTTON

*/

document
.getElementById("aics-send")
.addEventListener(
"click",
sendMessage
);

# /*

# ENTER

*/

document
.getElementById("aics-input")
.addEventListener(
"keydown",
function (event) {

```
    if (
      event.key === "Enter"
    ) {

      sendMessage();

    }

  }
);
```

})();
