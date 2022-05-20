let docusign = require("docusign-esign");
const { basePath, integrationKey } = require("../data/data");
let oAuthToken = docusign.ApiClient.OAuth;
let oAuth = docusign.ApiClient.OAuth;
let oAuthBasePath = oAuth.BasePath.DEMO;
let restApi = docusign.ApiClient.RestApi;
let RedirectUri  = "https://www.docusign.com/api"
let user = require("../data/data");
//let apiClient = new docusign.AccountsApi();

let apiClient = new docusign.ApiClient({
 basePath: basePath,
 oAuthBasePath: oAuthBasePath,
}); 


//console.log(basePath)
let responseType = apiClient.OAuth.ResponseType.CODE;
let scopes = [apiClient.OAuth.Scope.EXTENDED];

let randomState = '*^.$DGj*)+}Jk';
 //apiClient.setBasePath(basePath)

const events = require("events");

const eventEmitter = new events.EventEmitter()




//console.log(apiClient)


function login(req, res) {
  let authUri = apiClient.getAuthorizationUri(integrationKey, scopes, RedirectUri, responseType, randomState)

  //console.log(authUri)
  res.redirect(authUri)

  //return res.status(200).redirect(authUri)
  //apiClient.getAuthorizationUri()
  //console.log(authUri);
  //res.redirect(authUri)
  
/*   apiClient
    .generateAccessToken(user.integrationKey, ClientSecret, code)
    .then(function (oAuthToken) {
      assert.equal(err, undefined);
      assert.notEqual(oAuthToken, undefined);
      assert.notEqual(oAuthToken.accessToken, undefined);
      assert.ok(oAuthToken.expiresIn > 0);
      console.log(oAuthToken);
      apiClient
        .getUserInfo(oAuthToken.accessToken)
        .then(function (userInfo) {
          assert.equal(err, undefined);
          assert.notEqual(userInfo, undefined);
          assert.notEqual(userInfo.accounts, undefined);
          assert.ok(userInfo.accounts.length > 0);
          console.log("UserInfo: " + userInfo);
          // parse first account's basePath
          // below code required for production, no effect in demo (same
          // domain)
          apiClient.setBasePath(userInfo.accounts[0].baseUri + "/restapi");
          return done(oAuthToken);
        })
        .catch(function (err) {
          return done(err);
        });
    })
    .catch(function (err) {
      return done(err);
    }); */
}

//eventEmitter.on("login", login);
//eventEmitter.emit("login");

module.exports = {
    login,
}