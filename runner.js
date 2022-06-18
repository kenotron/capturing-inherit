const cp = require("child_process");

console.log("running a npm script");
console.log("--------------------");

const npmCp = cp.spawn(`npm`, ["run", "test"], {
  stdio: ["inherit", "inherit", "inherit"],
  env: process.env,
});

npmCp.on("exit", (code, status) => {
  console.log("\n");
  console.log("running arbitrary commands");
  console.log("-------------------------");
  cp.spawn(`ls`, ["--color"], {
    stdio: ["inherit", "inherit", "inherit"],
    env: process.env,
  });
});
