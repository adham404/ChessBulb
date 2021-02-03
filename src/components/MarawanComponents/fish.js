var Fish = new Worker("/stockfish.js" || "/stockfish.asm.js");
var send = function send(uci) {
  Fish.postMessage(uci);
};

var massage = Fish;
module.exports = {
  send,
  massage
};
