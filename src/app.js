const express = require("express");
const app = express();
const logger = require("../logger/dev-logger");
require("dotenv").config();

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
let RedirectUri = "http://localhost:4000/oauth-callback";

const passport = require("passport");
const { Strategy } = require("passport-docusign");
const auth_client = require("./sf-auth");

app.use(passport.initialize);

const config = {
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  ACCOUNT_ID: process.env.ACCOUNT_ID,
};

const AUTH_OPTIONS = {
  callbackUrl: RedirectUri,
  clientID: config.CLIENT_ID,
  clientSecret: config.CLIENT_SECRET,
};

function verifyCallback(accessToken, refreshToken, profile, done) {
  console.log("accessToken: " + accessToken);
  console.log("refreshToken: " + refreshToken);
  done(null);
}

console.log(config.CLIENT_ID)
passport.use(new Strategy(AUTH_OPTIONS, verifyCallback));
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
  headers: {curl -X POST "sandals.sharefile.com" -H "Content-Type: application/x-www-form-curlencoded" -d "grant_type=password&client_id=XPrnHHkcrQwBxbaAcIneUsRigrj2MZoK&client_secret=w50h7BlyBIn9YSp92Yw3MgLGr5Oa83NhJQ2dBtUKh0dW4gF2&username=sharefile@uvltd.com&password=Shar3file1337"
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

/* app.get("/", (req, res) => {
  console.log("-C-> /");
  try {
    auth_client.redirect(req, res);
  } catch (e) {
    console.log(e);
  }
});
 */
/*  async function test(req, res) {
  console.log(auth_client.authenticate(req, function(result){
    var token = result;
    console.log(token)
  }));
}

eventEmitter.on("test", test);

eventEmitter.emit("test");  */

/* app.get("/oauth", (req, res) => {
  auth_client.authenticate(req, function (result) {
    var token = JSON.parse(result).access_token;
    console.log(token);
  });
}); */

/* app.get("/auth", (req, res) => {
  let authUri = apiClient.getAuthorizationUri(
    integrationKey,
    scopes,
    RedirectUri,
    responseType,
    randomState
  );

  console.log(authUri);
  res.redirect(authUri);
}); */

app.get(
  "/auth",
  passport.authenticate("docusign", {
    scope: ["email"],
  })
);

app.get(
  "/oauth-callback",
  passport.authenticate("docusign", {
    failureRedirect: "/failure",
    successRedirect: "/",
    session: false,
  }),
  (req, res) => {
    console.log("docusign called us back");
  }
);

app.get("/failure", (req, res) => {
  return res.send("Failed to log in");
});
/* app.get("/oauth-callback", ({ query: { code } }, res) => {
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
}); */

//app.use("/redirect", loginRouter);
app.use("/shared", getSharedEnvelopesRouter);
app.use("/retrieve", retrieveRouter);
app.use("readerHandler", getEnvelopesInfoRouter);
app.use("file-handler", writeFileEnvelopeInfoRouter);

module.exports = app;
