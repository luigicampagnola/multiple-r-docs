let key_context = {
  hostname: "sandals.sharefile.com",
  username: "sharefile@uvltd.com",
  oldpw: "Shar3file1337",
  password: "nvyw mvcr gu4f gr2t",
  client_id: "XPrnHHkcrQwBxbaAcIneUsRigrj2MZoK",
  client_secret: "w50h7BlyBIn9YSp92Yw3MgLGr5Oa83NhJQ2dBtUKh0dW4gF2",
};

var https = require("https");

var client_id = key_context.client_id;
var client_secret = key_context.client_secret;
var redirect = "http://localhost:4004/oauth-cb";

// Make the posted data look like this:
// grant_type=authorization_code&code=[code]&client_id=[client_id]&client_secret=[client_secret]
var get_token_data_preamble = "grant_type=authorization_code&code=";
var get_token_options = {
  hostname: "secure.sharefile.com",
  port: "443",
  path: "/oauth/token",
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    "Content-Length": 10,
  },
};

module.exports = {
  redirect: function (req, resp) {
      console.log()
    // Redirect URI containts a response type (code) in ShareFile
    console.log(
      "<-C- Redirect to https://secure.sharefile.com/oauth/authorize?response_type=code&client_id=" +
        client_id +
        "&redirect_uri=" +
        redirect
    );
    resp.redirect(
      "https://secure.sharefile.com/oauth/authorize?response_type=code&client_id="+client_id+"&redirect_uri=" + redirect
    );
  },

  authenticate: function (req, callback) {
    console.log("-C-> authenticate: " + JSON.stringify(req.query));
    var code = req.query.code;
    // console.log("Received code: "+code);

    var get_token_data =
      get_token_data_preamble +
      code +
      "&client_id=" +
      client_id +
      "&client_secret=" +
      client_secret;
    // console.log("Sending token get request: " + get_token_data);

    // ShareFile sends token data in the body, must set type and length
    get_token_options.headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      "Content-Length": get_token_data.length,
    };
    // console.log("Get token options: "+ JSON.stringify(get_token_options));
    console.log("<-S- " + JSON.stringify(get_token_options) + get_token_data);

    var request = https.request(get_token_options, function (response) {
      var resultString = "";
      response.on("data", function (chunk) {
        resultString += chunk;
      });
      response.on("end", function (chunk) {
        console.log("-S-> auth result: " + resultString);
        callback(resultString);
      });
    });

    // Write the token data in the body
    request.write(get_token_data);
    request.end();
  },
};
