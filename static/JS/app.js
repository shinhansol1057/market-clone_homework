const displayChat = (chats) => {
  const chatDiv = document.querySelector("#new-chat");
  const div = document.createElement("div");
  const time = chats.hour>12? `오후 ${chats.hour-12}:${chats.minute}` : `오전 ${chats.hour}:${chats.minute}`
  div.innerHTML = `<div class="chat-right__msg">
                      ${chats.content}
                    </div>
                    <div class="chat-right__time">
                      <div>${time}</div>
                    </div>`;
  div.className = "chat-right";
  div.id = "#new-chat_plus"
  chatDiv.appendChild(div)
};

const readChat = async () => {
  const res = await fetch("/chat");
  const data = await res.json();
  const div = document.querySelector("#new-chat");
  div.innerHTML = `<div class="chat-right">
  <div class="chat-right__msg">
    오늘 시민공원 근처에서 7시에 가능하신가요?
  </div>
  <div class="chat-right__time">
    <div>오후 3:45</div>
  </div>
</div>
<div class="chat-left">
  <div class="chat-left__img">
    <img src="assets/user.svg" alt="user">
  </div>
  <div class="chat-left__msg">
    네 가능해요 그때 봐요!
  </div>
  <div class="chat-left__time">
    <div>
      오후 3:45
    </div>
  </div>
</div>`;
  data.forEach(displayChat);
};

const createChat = async (value) => {
  const res = await fetch("/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: new Date(),
      content: value,
      hour: new Date().getHours(),
      minute: new Date().getMinutes(),
    }),
  });
  readChat();
};

const handleSubmit = (e) => {
  e.preventDefault();
  const input = document.querySelector("#chat-input");
  createChat(input.value);
  input.value = "";
};

const form = document.querySelector("#chat-form");
form.addEventListener("submit", handleSubmit);

readChat();
