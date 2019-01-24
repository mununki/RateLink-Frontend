const express = require("express");
const next = require("next");
const lambdaWarmer = require("./utils/warmLambda");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    // server.use((req, res, next) => {
    //   req.url = req.originalUrl.replace(`staging/_next`, "_next");
    //   next(); // be sure to let the next middleware handle the modified request.
    // });

    server.get("/warm", async (req, res) => {
      await lambdaWarmer();
      res.send("Lambda warmed");
    });

    server.get("/", (req, res) => {
      return app.render(req, res, "/", req.params);
    });

    server.get("/signup", (req, res) => {
      return app.render(req, res, "/signup", req.params);
    });

    server.get("/login", (req, res) => {
      return app.render(req, res, "/login", req.params);
    });

    server.get("/rates", (req, res) => {
      return app.render(req, res, "/rates", req.params);
    });

    server.get("/charts", (req, res) => {
      return app.render(req, res, "/charts", req.params);
    });

    server.get("/profile", (req, res) => {
      return app.render(req, res, "/profile", req.params);
    });

    server.get("/friends", (req, res) => {
      return app.render(req, res, "/friends", req.params);
    });

    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(port, err => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  })
  .catch(ex => {
    console.log(ex);
    process.exit(1);
  });
