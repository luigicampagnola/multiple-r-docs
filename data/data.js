const docusign = require("docusign-esign");
const restApi = docusign.ApiClient.RestApi;

const basePath = restApi.BasePath.DEMO;

const user = {
  accessToken:
    "eyJ0eXAiOiJNVCIsImFsZyI6IlJTMjU2Iiwia2lkIjoiNjgxODVmZjEtNGU1MS00Y2U5LWFmMWMtNjg5ODEyMjAzMzE3In0.AQoAAAABAAUABwCA3EhTXTraSAgAgBxsYaA62kgCAOCB-Bn0sMFPsi_-6hcM_dAVAAEAAAAYAAEAAAAFAAAADQAkAAAAMzZlYjhkMjYtMjlhMC00ZjI3LWFmOTYtZGUxZjQ0NDM0NGRlIgAkAAAAMzZlYjhkMjYtMjlhMC00ZjI3LWFmOTYtZGUxZjQ0NDM0NGRlMAAAM5YHXTraSDcA3z38NkbRSUyWGDvYl4Ofxg.XgYyvOrK_dGXDg5ygUWKePMh8jbwMwo6BlW-rygtu7-yqrqIc_gLB4-W6hMWKf_uRuKzMpN4R5Xdx2nOQKFKoH_YIzZVSpsngzXnEIKZhjOPtJgI0lhKRB_bRBIn1w_FmCWNmuj7mwuK25PNQ3cVXv_rxJyWoaOropzDpbZGLd7e-YqxvFrkjy7OwexpoGdFTM-PPb8M-wVhOcPf7u4gG1Y4oUokcQU0tkfzHvNlZdegVSiTn33naKIzoqIFg962TsmPwLmAmap00Ul1cU5_AyBopXKjIlLOXD3hMFgaRYaRQLvSQUZo-YNe_gmC9bNvixObKlh-8PLoj-43jNXaHg",
  basePath: basePath,
  accountId: "d49abe6c-b9b4-4d91-a032-79c071964ca4",
  integrationKey: "36eb8d26-29a0-4f27-af96-de1f444344de",
  secretKey: "e144adc0-508d-405f-88f6-952169b13e14",
};

module.exports = user;
