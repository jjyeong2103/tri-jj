document.addEventListener('DOMContentLoaded', () => {
  const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

  const sendButton = document.getElementById('send-button');
  const userInput = document.getElementById('user-input');
  const chatWindow = document.getElementById('chat-window');

  async function handleSendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    addMessage('user', message);
    userInput.value = '';
    addMessage('bot', '⏳ 생각 중...');
    const response = await fetchChatGPT(message);

    // 마지막 '생각 중...' 메시지 제거
    const lastBot = chatWindow.querySelectorAll('.message');
    chatWindow.removeChild(lastBot[lastBot.length - 1]);
    addMessage('bot', response);
  }

  sendButton.addEventListener('click', handleSendMessage);
  userInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  });

  function addMessage(sender, text) {
    const msg = document.createElement('div');
    msg.classList.add('message');
    msg.innerHTML = `<strong>${sender === 'user' ? '🧑‍🎓 나' : '🤖 챗봇'}:</strong> ${text}`;
    chatWindow.appendChild(msg);
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }

  async function fetchChatGPT(message) {
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: message }],
        }),
      });

      const data = await response.json();
      return data.choices?.[0]?.message?.content.trim() || "⚠️ 응답을 이해하지 못했어요.";
    } catch (err) {
      console.error(err);
      return "❌ 오류가 발생했습니다.";
    }
  }
});
