const fs = require("fs");
const { execSync } = require("child_process");

function monkeyPatchProcessOutputs() {
  const stdoutBuffer = [];
  const write = process.stdout._write;
  const fd = fs.openSync("stdout.log", "w");

  process.stdout._write = (chunk, encoding, callback) => {
    stdoutBuffer.push(chunk);
    fs.appendFileSync(fd, chunk);
    write.apply(process.stdout, [chunk, encoding, callback]);
  };
}

monkeyPatchProcessOutputs();

execSync(`npm run test`, {
  stdio: ["inherit", "inherit", "inherit"],
  env: process.env,
});
