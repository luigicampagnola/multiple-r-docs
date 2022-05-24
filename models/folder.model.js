const docusign = require("docusign-esign");
const user  = require("../data/data");
const moment = require("moment");

async function getFolderModel(accountId, token, basePath) {


  let dsApiClient = new docusign.ApiClient();


  dsApiClient.setBasePath(basePath);

  dsApiClient.addDefaultHeader("Authorization", "Bearer " + token);




  //console.log(user.accessToken)
  let envelopesApi = new docusign.EnvelopesApi(dsApiClient),
    results = null;

    
  let options = { fromDate: moment().subtract(30, "days").format() };

  results = await envelopesApi.listStatusChanges(accountId, options).catch(err=>console.log(err))

  //console.log(results);
  
  return results;
}

async function getRecipientsInfoModel (accountId, envelopeId){
  let dsApiClient = new docusign.ApiClient();
  dsApiClient.setBasePath(user.basePath);
  dsApiClient.addDefaultHeader("Authorization", "Bearer " + user.accessToken);

  let envelopesApi = new docusign.EnvelopesApi(dsApiClient);

  results = await envelopesApi.listRecipients(
    accountId,
    envelopeId,
    null
  );

  return results;
}


module.exports = {
  getFolderModel,
  getRecipientsInfoModel,
};

