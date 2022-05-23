const { getFolderModel } = require("../models/folder.model");

const fs = require("fs"),
  JSONStream = require("JSONStream"),
  es = require("event-stream");
const events = require("events");
const path = require("path");
const { getUserInfoModel } = require("../models/userInfo.model");

const eventEmitter = new events.EventEmitter();

const folderPath = path.dirname(__dirname) + "/data/";


const userInfoFile = path.join(folderPath, "userInfo.json");

const accountInfoFile = path.join(folderPath, "accountInfo.json");

const accessTokenInfoFile = path.join(folderPath, "access-token.json");

const accessAccountInfoFile = path.join(folderPath, "user-Info.json");

// <-------------------------- W R I T E  I N F O  J S O N  F I L E S --------------------------------->


// WRITE FILE ENVELOPES

async function writeFileEnvelopesInfo() {
  const accountInfo = await readAccountInfo().catch((erro) => {
    console.log("error accountInfo writeFileEnvelopesInfo");
  });

  const accountId = accountInfo.accountIdGuid;
  const results = await getFolderModel(accountId).catch((error) =>
    console.log("error on createFileEnvelopeId")
  );
  if (results) {
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }
  }

  let writer = fs.createWriteStream(folderPath + "envelopes.json");

  writer.write(JSON.stringify(results, null, 2));

  return "Success";
}


// WRITE ACCOUNT INFO

async function writeAccountInfo() {
  const results = await getUserInfoModel().catch((err) =>
    console.log("err on getUserInfo writeAccountInfo")
  );
  
  console.log(results)

  if (results) {
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }
  }

  let writer = fs.createWriteStream(folderPath + "accountInfo.json");
  writer.write(JSON.stringify(results, null, 2));

  return "Success";
}


// <-------------------------- R E A D  I N F O  J S O N  F I L E S --------------------------------->

async function readAccountInfo() {
  let reader = fs.createReadStream(accountInfoFile);

  //console.log(reader)
  return new Promise((resolve, reject) => {
    reader.on("data", function (chunk) {
      //console.log(JSON.parse(chunk))
      return resolve(JSON.parse(chunk));
    });
  });
}

async function readEnvelopesInfo() {
  let reader = fs.createReadStream(userInfoFile, "utf8");
  let data = "";
  for await (const chunk of reader) {
    data += chunk;
  }

  //console.log(JSON.parse(data))
  return JSON.parse(data);
}

async function readAccessToken() {
  let accessToken = fs.createReadStream(accessTokenInfoFile, "utf8");
  let data = "";

  for await (const chunk of accessToken) {
    data += chunk;
  }

  console.log(data);
  return JSON.parse(data);
}

async function readAccountInformation() {
  let accountInfo = fs.createReadStream(accessAccountInfoFile, "utf8");
  let data = "";

  for await (const chunk of accountInfo) {
    data += chunk;
  }

  //console.log(JSON.parse(data));
  return JSON.parse(data);
}



eventEmitter.on("read", writeAccountInfo)
eventEmitter.emit("read");
//eventEmitter.on("readAccountInfo", readEnvelopesInfo);

module.exports = {
  writeFileEnvelopesInfo,
  readEnvelopesInfo,
  readAccountInfo,
  readAccessToken,
  readAccountInformation
};
