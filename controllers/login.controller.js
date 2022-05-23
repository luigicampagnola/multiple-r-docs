/* let docusign = require("docusign-esign");
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



const events = require("events");

const eventEmitter = new events.EventEmitter()






function login(req, res) {
  let authUri = apiClient.getAuthorizationUri(integrationKey, scopes, RedirectUri, responseType, randomState)

  //console.log(authUri)
  res.redirect(authUri)

}



module.exports = {
    login,
} */