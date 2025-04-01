import express from "express";
import httpProxy from "http-proxy";

const app = express();
const port = 8080;

const proxy = httpProxy.createProxy();

app.use((req, res) => {
  const resolvesTo = `http://localhost:3000`;

  return proxy.web(req, res, { target: resolvesTo });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
