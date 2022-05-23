const docusign = require("docusign-esign");
const user = require("../data/data");

/* const events = require("events");

const eventEmitter = new events.EventEmitter(); */


async function getUserInfoModel() {

  let dsApiClient = new docusign.ApiClient();
  dsApiClient.setBasePath(user.basePath);
  dsApiClient.addDefaultHeader("Authorization", "Bearer " + user.accessToken);

  const accountsApi = new docusign.AccountsApi(dsApiClient);
  const account = await accountsApi.getAccountInformation(user.accountId);
  
  return account;
}



//eventEmitter.on("getUser", getUserInfoModel);
//eventEmitter.emit("getUser");

module.exports = {
  getUserInfoModel,
};
