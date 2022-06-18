# How to capture a child_process's inherit outputs
https://twitter.com/kenneth_chau/status/1538205757291651072?s=20&t=Koe9gd4XMzdEgKi9IImzog

## 1. fork a `runner.js` w/ `stdio: pipe` + add `on('data')` handler

```js
const forked = fork("runner.js", {
  stdio: ["ignore", "pipe", "pipe", "ipc"],
});
```

## 2. `runner.js`, in turn executes a command (even `child_process` spawn or exec with inherit)
```js
execSync(`npm run test`, {
  stdio: ["inherit", "inherit", "inherit"],
  env: process.env,
});
```

## 3. Capture output from pipe: `index.js`

```js
let msgs = [];

forked.stdout.on("data", (data) => {
  msgs.push(data);
});

forked.on("exit", (code, signal) => {
  console.log(`${msgs.join("")}`);
});
```