(function () {
  "use strict";

  /*
  ========================================
  AI-CS NEW — LIVE CHAT WIDGET
  ========================================
  */

  const script = document.currentScript;

  const AI_CS_URL =
    "https://ai-cs-new.onrender.com";

  const companyId =
    String(
      script?.dataset?.companyId || ""
    )
      .trim()
      .toUpperCase();

  const customerId =
    String(
      window.currentCustomer?.id || ""
    )
      .trim()
      .toUpperCase();

  /*
  ========================================
  VALIDASI
  ========================================
  */

  if (!companyId) {
    console.error(
      "AI-CS: data-company-id wajib diisi."
    );
    return;
  }

  if (!customerId) {
    console.error(
      "AI-CS: Customer ID tidak ditemukan."
    );
    return;
  }

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

    #aics-title {
      font-weight: bold;
      font-size: 16px;
    }

    #aics-status {
      margin-top: 4px;
      font-size: 12px;
      color: #d1d5db;
    }

    #aics-close {
      float: right;
      border: none;
      background: transparent;
      color: white;
      font-size: 20px;
      cursor: pointer;
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
      border-top: 1px solid #ddd;
      background: white;
    }

    #aics-input {
      flex: 1;
      min-width: 0;
      padding: 10px;
      border: 1px solid #ccc;
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
    }

    @media (max-width: 500px) {
      #aics-window {
        right: 10px;
        bottom: 80px;
        width: calc(100% - 20px);
        height: 70vh;
        max-height: 600px;
      }

      #aics-messages {
        height: calc(70vh - 110px);
        max-height: 490px;
      }
    }
  `;

  document.head.appendChild(style);

  /*
  ========================================
  TOMBOL CHAT
  ========================================
  */

  const button =
    document.createElement("button");

  button.id = "aics-button";
  button.type = "button";
  button.textContent = "💬";

  button.setAttribute(
    "aria-label",
    "Buka AI Customer Service"
  );

  document.body.appendChild(button);

  /*
  ========================================
  WINDOW CHAT
  ========================================
  */

  const chat =
    document.createElement("div");

  chat.id = "aics-window";

  chat.innerHTML = `
    <div id="aics-header">

      <button
        id="aics-close"
        type="button"
      >
        ×
      </button>

      <div id="aics-title">
        AI Customer Service
      </div>

      <div id="aics-status">
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

  /*
  ========================================
  BUKA CHAT
  ========================================
  */

  button.addEventListener(
    "click",
    function () {

      chat.style.display =
        chat.style.display === "block"
          ? "none"
          : "block";

      if (
        chat.style.display === "block"
      ) {
        input.focus();
      }

    }
  );

  /*
  ========================================
  TUTUP CHAT
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
  TAMBAH PESAN
  ========================================
  */

  function addMessage(
    text,
    type
  ) {

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
      String(text || "");

    messages.appendChild(
      message
    );

    messages.scrollTop =
      messages.scrollHeight;
  }

  /*
  ========================================
  KIRIM PESAN
  ========================================
  */

  async function sendMessage() {

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

    sendButton.disabled = true;

    const loading =
      document.createElement("div");

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

      const data =
        await response.json();

      loading.remove();

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
      ========================================
      NAMA CUSTOMER DINAMIS
      ========================================
      */

      const customerName =
        String(
          data.customerName || ""
        ).trim();

      /*
      ========================================
      PESAN PEMBUKA
      ========================================
      */

      if (
        customerName &&
        messages.children.length === 0
      ) {

        addMessage(
          `Halo ${customerName}, ada yang bisa saya bantu?`,
          "ai"
        );

      }

      /*
      ========================================
      JAWABAN AI
      ========================================
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

    } finally {

      sendButton.disabled = false;

      input.focus();

    }
  }

  /*
  ========================================
  TOMBOL KIRIM
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
    "AI-CS New Widget aktif",
    {
      companyId:
        companyId,

      customerId:
        customerId
    }
  );

})();
