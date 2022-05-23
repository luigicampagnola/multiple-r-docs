const user = require("../data/data");
const { retrieveModel } = require("../models/retrieve.model");

const { createFolderDownload } = require("../src/folderFile");

const { Readable } = require("stream");
const fs = require("fs");
const events = require("events");
const path = require("path");
const {
  readAccountInfo,
  readEnvelopesInfo,
} = require("../file-handlers/readWriteAPI");

const eventEmitter = new events.EventEmitter();

// <-----------------------------------------------------------> //
// ######### R E T R I E V E  C O N T R O L L E R

async function retrieveController(i) {
  const accountInfo = await readAccountInfo().catch((error) => {
    console.log("error on accountInfo retrieveController");
  });

  const accountId = accountInfo.accountIdGuid;

  const envelopesInfo = await readEnvelopesInfo().catch((err) => {
    console.log("error on envelopesInfo");
  });

  const envelopes = envelopesInfo.envelopes;

  const envelopeIds = envelopes.map((envelope) => {
    return envelope.envelopeId;
  });

  const args = {
    accessToken: user.accessToken,
    basePath: user.basePath,
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



async function resultsHandler() {
  const envelopesInfo = await readEnvelopesInfo().catch((err) => {
    console.log("error on envelopesInfo resultsHandler");
  });

  const accountInfo = await readAccountInfo().catch((erro) => {
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

  const accountName = accountInfo.accountName;
  let count = 0;

  const dataResult = await Promise.all(
    envelopeIds.map(async (envelope, i) => {
      let data = await retrieveController(i).catch((err) => {
        console.log("error getting results in resultHandler let data");
      });


      let buff = Buffer.from(data, "binary");

      let readable = new Readable();
      readable._read = () => {};
      readable.push(buff, "binary");
      readable.push(null);
      //console.log("READABLE", readable)

      let fileName = `/Users/luigi.campagnola/documents/Test/downloads/${accountName}/${emailSubjects[i]}-${formatDateTime[i]}.pdf`;
      let writable = fs.createWriteStream(fileName);


      readable.pipe(writable)
      
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
