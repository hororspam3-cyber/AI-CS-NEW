(function () {
  "use strict";

  /*
  ========================================
  AI-CS LIVE CHAT WIDGET
  ========================================
  */

  const script = document.currentScript;

  const companyId = String(
    script?.dataset?.companyId || ""
  )
    .trim()
    .toUpperCase();

  const customerId = String(
    script?.dataset?.customerId || ""
  )
    .trim()
    .toUpperCase();

  /*
  ========================================
  VALIDASI
  ========================================
  */

  if (!companyId || !customerId) {
    console.error(
      "AI-CS: companyId dan customerId wajib diisi."
    );
    return;
  }

  /*
  ========================================
  AI-CS SERVER
  ========================================
  */

  const AI_CS_URL =
    "https://ai-cs-new.onrender.com";

  /*
  ========================================
  STYLE
  ========================================
  */

  const style =
    document.createElement("style");

  style.textContent = `
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

      box-shadow:
        0 4px 15px rgba(0,0,0,0.25);

      transition:
        transform 0.2s ease;
    }

    #aics-button:hover {
      transform: scale(1.05);
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

      box-shadow:
        0 5px 25px rgba(0,0,0,0.25);

      overflow: hidden;

      z-index: 999999;

      font-family:
        Arial,
        sans-serif;
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

      word-wrap: break-word;
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

      border-top:
        1px solid #ddd;

      background: white;
    }

    #aics-input {
      flex: 1;

      min-width: 0;

      padding: 10px;

      border:
        1px solid #ccc;

      border-radius: 8px;

      outline: none;

      font-size: 14px;
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

      cursor: not-allowed;
    }

    #aics-close {
      float: right;

      border: none;

      background: transparent;

      color: white;

      font-size: 20px;

      cursor: pointer;

      line-height: 1;
    }

    @media (max-width: 500px) {

      #aics-button {
        right: 15px;
        bottom: 15px;
      }

      #aics-window {
        right: 10px;
        bottom: 80px;

        width:
          calc(100% - 20px);

        height: 70vh;

        max-height: 600px;
      }

      #aics-messages {
        height:
          calc(70vh - 110px);

        max-height: 490px;
      }
    }
  `;

  document.head.appendChild(style);

  /*
  ========================================
  CHAT BUTTON
  ========================================
  */

  const button =
    document.createElement("button");

  button.id =
    "aics-button";

  button.type =
    "button";

  button.textContent =
    "💬";

  button.setAttribute(
    "aria-label",
    "Buka AI Customer Service"
  );

  document.body.appendChild(button);

  /*
  ========================================
  CHAT WINDOW
  ========================================
  */

  const chat =
    document.createElement("div");

  chat.id =
    "aics-window";

  chat.innerHTML = `
    <div id="aics-header">

      <button
        id="aics-close"
        type="button"
        aria-label="Tutup chat"
      >
        ×
      </button>

      <div id="aics-header-title">
        AI Customer Service
      </div>

      <div id="aics-header-status">
        ● Online
      </div>

    </div>

    <div id="aics-messages">

      <div
        class="aics-message aics-ai"
      >
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

      <button
        id="aics-send"
        type="button"
      >
        Kirim
      </button>

    </div>
  `;

  document.body.appendChild(chat);

  /*
  ========================================
  ELEMENT
  ========================================
  */

  const input =
    document.getElementById(
      "aics-input"
    );

  const sendButton =
    document.getElementById(
      "aics-send"
    );

  const closeButton =
    document.getElementById(
      "aics-close"
    );

  const messages =
    document.getElementById(
      "aics-messages"
    );

  const status =
    document.getElementById(
      "aics-header-status"
    );

  /*
  ========================================
  OPEN CHAT
  ========================================
  */

  button.addEventListener(
    "click",
    function () {

      if (
        chat.style.display === "block"
      ) {

        chat.style.display =
          "none";

        return;
      }

      chat.style.display =
        "block";

      input.focus();

    }
  );

  /*
  ========================================
  CLOSE CHAT
  ========================================
  */

  closeButton.addEventListener(
    "click",
    function () {

      chat.style.display =
        "none";

    }
  );

  /*
  ========================================
  ADD MESSAGE
  ========================================
  */

  function addMessage(
    text,
    type
  ) {

    const message =
      document.createElement(
        "div"
      );

    message.className =
      "aics-message " +
      (
        type === "user"
          ? "aics-user"
          : "aics-ai"
      );

    message.textContent =
      String(text || "");

    messages.appendChild(
      message
    );

    messages.scrollTop =
      messages.scrollHeight;
  }

  /*
  ========================================
  SEND MESSAGE
  ========================================
  */

  async function sendMessage() {

    const message =
      input.value.trim();

    if (!message) {
      return;
    }

    /*
    ----------------------------------------
    CUSTOMER MESSAGE
    ----------------------------------------
    */

    addMessage(
      message,
      "user"
    );

    input.value = "";

    sendButton.disabled =
      true;

    /*
    ----------------------------------------
    LOADING
    ----------------------------------------
    */

    const loading =
      document.createElement(
        "div"
      );

    loading.className =
      "aics-message aics-ai";

    loading.textContent =
      "Sedang mengetik...";

    messages.appendChild(
      loading
    );

    messages.scrollTop =
      messages.scrollHeight;

    try {

      /*
      ======================================
      KIRIM KE AI-CS
      ======================================
      */

      const response =
  await fetch(
    AI_CS_URL +
    "/api/chat",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json"
            },

            body:
              JSON.stringify({

                companyId:
                  companyId,

                customerId:
                  customerId,

                message:
                  message

              })
          }
        );

      /*
      ======================================
      BACA RESPONSE
      ======================================
      */

      let data;

      try {

        data =
          await response.json();

      } catch (jsonError) {

        throw new Error(
          "Response server tidak valid."
        );

      }

      /*
      ======================================
      HAPUS LOADING
      ======================================
      */

      loading.remove();

      /*
      ======================================
      ERROR SERVER
      ======================================
      */

      if (
        !response.ok ||
        !data.success
      ) {

        addMessage(
          data.message ||
          "AI tidak dapat memproses pesan.",
          "ai"
        );

        return;
      }

      /*
      ======================================
      JAWABAN AI
      ======================================
      */

      addMessage(
        data.reply ||
        "AI tidak memberikan jawaban.",
        "ai"
      );

    } catch (error) {

      console.error(
        "AI-CS WIDGET ERROR:",
        error
      );

      loading.textContent =
        "Tidak dapat terhubung ke AI Customer Service.";

      status.textContent =
        "● Connection error";

    } finally {

      sendButton.disabled =
        false;

      input.focus();

    }
  }

  /*
  ========================================
  SEND BUTTON
  ========================================
  */

  sendButton.addEventListener(
    "click",
    sendMessage
  );

  /*
  ========================================
  ENTER
  ========================================
  */

  input.addEventListener(
    "keydown",
    function (event) {

      if (
        event.key === "Enter"
      ) {

        event.preventDefault();

        sendMessage();

      }

    }
  );

  /*
  ========================================
  READY
  ========================================
  */

  console.log(
    "AI-CS Widget aktif:",
    {
      companyId:
        companyId,

      customerId:
        customerId
    }
  );

})();
