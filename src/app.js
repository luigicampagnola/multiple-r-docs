const express = require("express");
const app = express();
const logger = require("../logger/dev-logger");

const retrieveRouter = require("../routes/retrieve.router");
const writeFileEnvelopeInfoRouter = require("../routes/file-handler.router");
const getEnvelopesInfoRouter = require("../routes/readerHandler-router");
const getSharedEnvelopesRouter = require("../routes/getSharedEnvelopes.router");

app.use(express.json());
const fs = require("fs");

const path = require("path");
const folderPath = path.dirname(__dirname) + "/data/";
let docusign = require("docusign-esign");
const { basePath, integrationKey, secretKey } = require("../data/data");
let oAuth = docusign.ApiClient.OAuth;
let oAuthBasePath = oAuth.BasePath.DEMO;
let RedirectUri = "http://localhost:4004/oauth-callback";

const auth_client = require("./sf-auth");

let apiClient = new docusign.ApiClient({
  basePath: basePath,
  oAuthBasePath: oAuthBasePath,
});

//console.log(basePath)
let responseType = apiClient.OAuth.ResponseType.CODE;
let scopes = [apiClient.OAuth.Scope.SIGNATURE];

let randomState = "*^.$DGj*)+}Jk";

/* let key_context = {
  hostname: "sandals.sharefile.com",
  username: "sharefile@uvltd.com",
  oldpw: "Shar3file1337",
  password: "nvyw mvcr gu4f gr2t",
  client_id: "XPrnHHkcrQwBxbaAcIneUsRigrj2MZoK",
  client_secret: "w50h7BlyBIn9YSp92Yw3MgLGr5Oa83NhJQ2dBtUKh0dW4gF2",
};

let client_id = key_context.client_id;
let client_secret = key_context.client_secret;
let redirect_uri = "http://localhost:4004/oauth-token";
var get_toke_data_preamble = "grant_type = authorization_code&code";
var get_token_options = {
  hostname: "http://secure.sharefile.com",
  port: "4004",
  path: "/oauth/token",
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    "Content-Length": 10
  }
};

app.get("/oauth", (req, res)=>{
  let authUri = `https://secure.sharefile.com/oauth/authorize?response_type=code&client_id=${client_id}&redirect_uri=${redirect_uri}`
  res.redirect(authUri)
})

app.get("/oauth-token", ({ query: {code}}, res)=>{
  console.log(12);
}) */

app.get("/", (req, res) => {
  console.log("-C-> /");
  try {
    auth_client.redirect(req, res);
  } catch (e) {
    console.log(e);
  }
});

app.get("/oauth", (req, res) => {
  console.log(`-C-> /auth`);
  let subdomain = req.query.subdomain;
  console.log(subdomain);
});



app.get("/auth", (req, res) => {
  let authUri = apiClient.getAuthorizationUri(
    integrationKey,
    scopes,
    RedirectUri,
    responseType,
    randomState
  );

  console.log(authUri);
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
    res.end();
});

//app.use("/redirect", loginRouter);
app.use("/shared", getSharedEnvelopesRouter);
app.use("/retrieve", retrieveRouter);
app.use("readerHandler", getEnvelopesInfoRouter);
app.use("file-handler", writeFileEnvelopeInfoRouter);

module.exports = app;
