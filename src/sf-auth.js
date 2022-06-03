let key_context = {
  hostname: "sandals.sharefile.com",
  username: "sharefile@uvltd.com",
  oldpw: "Shar3file1337",
  password: "nvyw mvcr gu4f gr2t",
  client_id: "XPrnHHkcrQwBxbaAcIneUsRigrj2MZoK",
  client_secret: "w50h7BlyBIn9YSp92Yw3MgLGr5Oa83NhJQ2dBtUKh0dW4gF2",
};

var axios = require("axios").default;

var client_id = key_context.client_id;
var client_secret = key_context.client_secret;
const http = require("http");

// Make the posted data look like this:
// grant_type=authorization_code&code=[code]&client_id=[client_id]&client_secret=[client_secret]

var options2 = {
  hostname: "sandals.sharefile.com",
  path: "http://localhost:4004/oauth",
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    "Content-Length": 10,
  },
  params: {
    grant_type: "password",
    client_id: client_id,
    client_secret: client_secret,
    username: key_context.username,
    password: key_context.password,
  },
};

var options = {
  method: "POST",
  url: "http://sandals.sharefile.com/oauth/token",
  headers: { "content-type": "application/x-www-form-urlencoded" },
  data: {
    grant_type: "password",
    username: "sharefile@uvltd.com",
    password: "nvyw mvcr gu4f gr2t",

    client_id: "XPrnHHkcrQwBxbaAcIneUsRigrj2MZoK",
    client_secret: "w50h7BlyBIn9YSp92Yw3MgLGr5Oa83NhJQ2dBtUKh0dW4gF2",
  },
};



module.exports = {
  authenticate: async function (req, callback) {
    await axios.post(options.url, {
      data: {
        grant_type: "password",
        username: "sharefile@uvltd.com",
        password: "nvyw mvcr gu4f gr2t",
    
        client_id: "XPrnHHkcrQwBxbaAcIneUsRigrj2MZoK",
        client_secret: "w50h7BlyBIn9YSp92Yw3MgLGr5Oa83NhJQ2dBtUKh0dW4gF2",
      },    
    }).catch(e =>console.log(e))
  },
};
