const docusign = require("docusign-esign");
let count = 0;
/* --experimental-repl-await
 */// R E T R I E V E  M O D E L
function delay (t) {
  return new Promise(resolve => setTimeout(resolve, t));
}

async function retrieveModel(
  accessToken,
  basePath,
  accountId,
  documentId,
  envelopeId
) {
  let dsApiClient = new docusign.ApiClient();
  dsApiClient.setBasePath(basePath);
  dsApiClient.addDefaultHeader("Authorization", "Bearer " + accessToken);

  let envelopesApi = new docusign.EnvelopesApi(dsApiClient),
    results = null;

    //console.log("retrieveModel", count++)
    
  console.log(count++)
  return results = await envelopesApi.getDocument(
    accountId,
    envelopeId,
    "combined", //combined or archived
    {}
  );
}

module.exports = {
  retrieveModel,
};
