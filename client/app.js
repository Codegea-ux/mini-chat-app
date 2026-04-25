const socket = io();

let username = "";

function joinChat() {
    username = document.getElementById("username").value;
    if (!username) return alert("Enter username");

    socket.emit("join", username);
}

function sendMessage() {
    const msgInput = document.getElementById("message");
    const msg = msgInput.value;

    if (!msg) return;

    socket.emit("sendMessage", msg);
    msgInput.value = "";
}

socket.on("message", (data) => {
    const chat = document.getElementById("chat");

    const div = document.createElement("div");

    if (data.user === "System") {
        div.className = "system-message";
        div.textContent = data.text;
    } else {
        div.className = "message " + 
            (data.user === username ? "my-message" : "other-message");

        div.textContent = `${data.user}: ${data.text}`;
    }

    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
});

socket.on("userList", (users) => {
    const ul = document.getElementById("users");
    ul.innerHTML = "";

    users.forEach(user => {
        const li = document.createElement("li");
        li.textContent = "🟢 " + user.username;
        ul.appendChild(li);
    });
});