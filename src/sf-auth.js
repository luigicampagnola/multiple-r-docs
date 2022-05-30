

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
  params: {
    grant_type: "password",
    client_id: client_id,
    client_secret: client_secret,
    username: key_context.username,
    password: key_context.password,
  },
};

module.exports = {
  authenticate: function (req, callback) {
    var request = https.request(get_token_options, function (response) {
      var resultString = "";
      response.on("data", function (chunk) {
        try {
          resultString += chunk;
          console.log(chunk);
        } catch (e) {
          console.log("error");
        }
      });
      response.on("end", function (chunk) {
        console.log("-S-> auth result: " + resultString);
        callback(resultString);
        console.log(resultString);
      });
      console.log(response);
    });

    console.log(request);
/* 
      request.write(callback);
      request.end(); */
    // Write the token data in the body
    /*     request.write(get_token_data);
     */
  },
};
