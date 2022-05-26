const express = require("express");
const app = express();
const logger = require("../logger/dev-logger");

/* logger.info("text  info")
logger.warn("text warn")
logger.error("text error")  */
const retrieveRouter = require("../routes/retrieve.router");
const writeFileEnvelopeInfoRouter = require("../routes/file-handler.router");
const getEnvelopesInfoRouter = require("../routes/readerHandler-router");
const getSharedEnvelopesRouter = require("../routes/getSharedEnvelopes.router");

app.use(express.json()); //convert every request to a js object
const path = require("path");
const folderPath = path.dirname(__dirname) + "/data/";
const fs = require("fs");
let docusign = require("docusign-esign");
const { basePath, integrationKey, secretKey } = require("../data/data");
const data = require("../data/data");
let oAuth = docusign.ApiClient.OAuth;
let oAuthBasePath = oAuth.BasePath.DEMO;
let RedirectUri = "http://localhost:4004/oauth-callback";

let apiClient = new docusign.ApiClient({
  basePath: basePath,
  oAuthBasePath: oAuthBasePath,
});

//console.log(basePath)
let responseType = apiClient.OAuth.ResponseType.CODE;
let scopes = [apiClient.OAuth.Scope.SIGNATURE];

let randomState = "*^.$DGj*)+}Jk";

app.get("/auth", (req, res) => {
  let authUri = apiClient.getAuthorizationUri(
    integrationKey,
    scopes,
    RedirectUri,
    responseType,
    randomState
  );

  //console.log(authUri)
  res.redirect(authUri);
});

app.get("/oauth-callback", ({ query: { code } }, res) => {
  //res.send(code);
  //console.log(code);
  let authCode = code;
  apiClient
    .generateAccessToken(integrationKey, secretKey, authCode)
    .then(function (oAuthToken) {
      console.log(oAuthToken);
      if (oAuthToken) {
        if (!fs.existsSync(folderPath)) {
          fs.mkdirSync(folderPath);
          logger.info("Started" + oAuthToken);
        }
      }
      let writeToken = fs.createWriteStream(folderPath + "access-token.json");
      writeToken.write(JSON.stringify(oAuthToken, null, 2));

      apiClient.getUserInfo(oAuthToken.accessToken).then(function (userInfo) {
        //console.log(userInfo);
        if (userInfo) {
          if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath);
          }
        }
        let writer = fs.createWriteStream(folderPath + "user-Info.json");
        writer.write(JSON.stringify(userInfo, null, 2));
      });
    });
});

app.post("/oauth", (req, res) => {
  const setKeys = {
    hostname: "sandals.sharefile.com",
    username: "sharefile@uvltd.com",
    oldpw: "Shar3file1337",
    password: "nvyw mvcr gu4f gr2t",
    client_id: "XPrnHHkcrQwBxbaAcIneUsRigrj2MZoK",
    client_secret: "w50h7BlyBIn9YSp92Yw3MgLGr5Oa83NhJQ2dBtUKh0dW4gF2",
  };
  let uriPath = "http://localhost:4004/oauth/token"; 
});
//app.use("/redirect", loginRouter);
app.use("/shared", getSharedEnvelopesRouter);
app.use("/retrieve", retrieveRouter);
app.use("readerHandler", getEnvelopesInfoRouter);
app.use("file-handler", writeFileEnvelopeInfoRouter);

module.exports = app;
