const { fork } = require("child_process");

const forked = fork("runner.js", {
  stdio: ["ignore", "pipe", "pipe", "ipc"],
});

let msgs = [];

forked.stdout.on("data", (data) => {
  msgs.push(data);
});

forked.on("exit", (code, signal) => {
  console.log(`${msgs.join("\n")}`);
});
