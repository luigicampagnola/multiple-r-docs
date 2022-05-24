const user = require("../data/data");
const { retrieveModel } = require("../models/retrieve.model");

const { createFolderDownload } = require("../src/folderFile");

const { Readable } = require("stream");
const fs = require("fs");
const events = require("events");
const path = require("path");
const {
  readEnvelopesInfo,
  readAccountInformation,
  readAccessToken,
} = require("../file-handlers/readWriteAPI");

const eventEmitter = new events.EventEmitter();

// <-----------------------------------------------------------> //
// ######### R E T R I E V E  C O N T R O L L E R

async function retrieveController(i) {
  const accountInfo = await readAccountInformation().catch((error) => {
    console.log("error on accountInfo retrieveController");
  });

  const accountId = accountInfo.accounts[0].accountId;
  const basePath = accountInfo.accounts[0].baseUri + "/restapi";

  const envelopesInfo = await readEnvelopesInfo().catch((err) => {
    console.log("error on envelopesInfo");
  });

  const envelopes = envelopesInfo.envelopes;

  const getAccessToken = await readAccessToken().catch((err) => {
    console.log("error getting accessToken retrieveController");
  });

  let accessToken = getAccessToken.accessToken;

  const envelopeIds = envelopes.map((envelope) => {
    return envelope.envelopeId;
  });

  const args = {
    accessToken: accessToken,
    basePath: basePath,
    accountId: accountId,
    documentId: "combined",
    envelopeId: envelopeIds,
  };

  const downloadResults = await retrieveModel(
    args.accessToken,
    args.basePath,
    args.accountId,
    args.documentId,
    args.envelopeId[i]
  ).catch((error) => {
    console.log("failed to downloadResults retrieveController");
  });

  if (downloadResults) {
    await createFolderDownload();
  } else {
    console.log("error on createfolder retrieveController");
  }
  return downloadResults;
}

function delay(t) {
  return new Promise((resolve) => setTimeout(resolve, t));
}

async function resultsHandler() {
  const envelopesInfo = await readEnvelopesInfo().catch((err) => {
    console.log("error on envelopesInfo resultsHandler");
  });

  const accountInfo = await readAccountInformation().catch((erro) => {
    console.log("error on accountInfo resultsHandler");
  });

  //console.log(envelopesInfo)
  const envelopes = envelopesInfo.envelopes;

  const envelopeDate = envelopes.map((envelope) => {
    return envelope.createdDateTime;
  });

  const formatDateTime = envelopeDate.map((date) => {
    return date.slice(0, -9);
  });

  const envelopeIds = envelopes.map((envelope) => {
    return envelope.envelopeId;
  });

  const emailSubjects = envelopes.map((envelope) => {
    return envelope.emailSubject;
  });

  const accountName = accountInfo.name;

  const dataResult = await Promise.all(
    envelopeIds.map(async (envelope, i) => {
      await delay(10000)
      let data = await retrieveController(i).catch((err) => {
        console.log("error getting results in resultHandler let data");
      });

      let buff = Buffer.from(data, "binary");

      let readable = new Readable();
      readable._read = () => {};
      readable.push(buff, "binary");
      readable.push(null);
      //console.log("READABLE", readable)



      let fileName = `/Users/luigi.campagnola/documents/Test/multiple-r-docs/downloads/${accountName}/${emailSubjects[i]}-${formatDateTime[i]}.pdf`;
      let writable = fs.createWriteStream(fileName);



    
      console.log("retrieveModel " + formatDateTime[i])
      readable.pipe(writable);

    })
  );
  return dataResult;
}

//eventEmitter.on("results", resultsHandler);
//eventEmitter.emit("results");

//eventEmitter.on("name", getRecipientsNames);
//eventEmitter.emit("name");

//eventEmitter.on("date", getRecipientsDate);
//eventEmitter.emit("date");

module.exports = {
  retrieveController,
};
