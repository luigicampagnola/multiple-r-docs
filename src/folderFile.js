const { readAccountInformation } = require("../file-handlers/readWriteAPI")
const fs = require("fs");

const path = require("path");

async function createFolderDownload() {
  const accountInfo = await readAccountInformation().catch((err) =>
    console.log("error accountInfo createFolderDownload")
  );

  const accountName = accountInfo.name;
  let formatedName = accountName.replace(/ /g, "_")

  const folderDownload = path.dirname(__dirname) + "/downloads/";


  //console.log(__dirname)
  const accountNameFolder = folderDownload + formatedName;

  //console.log(accountNameFolder);
  if (!fs.existsSync(folderDownload)) {
    fs.mkdirSync(folderDownload);
  }
  if (!fs.existsSync(accountNameFolder)) {
    fs.mkdirSync(accountNameFolder);
  }
}

module.exports = { createFolderDownload };
