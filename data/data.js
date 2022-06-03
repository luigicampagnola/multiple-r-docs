const docusign = require("docusign-esign");
const restApi = docusign.ApiClient.RestApi;

const basePath = restApi.BasePath.DEMO;

const user = {
  accessToken:
    "eyJ0eXAiOiJNVCIsImFsZyI6IlJTMjU2Iiwia2lkIjoiNjgxODVmZjEtNGU1MS00Y2U5LWFmMWMtNjg5ODEyMjAzMzE3In0.AQoAAAABAAUABwCAJsSylD3aSAgAgGbnwNc92kgCAOCB-Bn0sMFPsi_-6hcM_dAVAAEAAAAYAAEAAAAFAAAADQAkAAAAMzZlYjhkMjYtMjlhMC00ZjI3LWFmOTYtZGUxZjQ0NDM0NGRlIgAkAAAAMzZlYjhkMjYtMjlhMC00ZjI3LWFmOTYtZGUxZjQ0NDM0NGRlMAAA5ZpwlD3aSDcA3z38NkbRSUyWGDvYl4Ofxg.tW1FvYyPAG54ckUbXysIPrSZVRfYvnlPh3LM2CKRndI3s429C521vFbIQYrJh_1S8ihzWPNLdpwzkCgwozH5X2_0o1ay0mzXVSeqeogRuKoZ0HFg8_YwbrcniZtYmMHkMUy70xKjZAK88lEOTtFY70J6r2MY-IThc-rvYl50xYO80caDbinPmXM5REvIV5EzyzU5wNdUVEc_OFt7gnS2VeM4wJ_sQqdJ_GOoah1oWSbMXKIxx7DLnW2VVgB1pFm_KCd0P6-00IauSHr6s1dB9joqVb-1AA9MueNrzaQgyje7SfzGzOYqtX3K3R2JsFMthQOui7jUZ7qIz3o6TwGKpA",
  basePath: basePath,
  accountId: "7e1b7492-5a6c-4d24-bce2-1e679cc28e27",
  integrationKey: "5c7d14bc-7b24-4674-8c08-1729267e47eb",
  secretKey: "5f4c79d2-1b2b-445b-bc50-4d36b5798159",
};

module.exports = user;
