let webSocket = new WebSocket("wss://chat.cmyui.xyz/ws");

webSocket.addEventListener("open", (e) => {
    webSocket.send("GoodDay");
});

webSocket.addEventListener("message", (e) => {
    console.log("Message from server", e.data);
});