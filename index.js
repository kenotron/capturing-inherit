const { fork } = require("child_process");
const fs = require('fs');

const forked = fork("runner.js", {
  stdio: ["ignore", "pipe", "pipe", "ipc"],
});

let msgs = [];

const fd = fs.openSync('stdout.log', 'w');
forked.stdout.on("data", (data) => {
  msgs.push(data);
  fs.appendFileSync(fd, data);
});

forked.on("exit", (code, signal) => {
  console.log(`${msgs.join("")}`);
  fs.closeSync(fd);
});
