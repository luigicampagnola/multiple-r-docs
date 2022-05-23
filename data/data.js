const docusign = require("docusign-esign");
const restApi = docusign.ApiClient.RestApi;

const basePath = restApi.BasePath.DEMO;

const user = {
  accessToken:
    "eyJ0eXAiOiJNVCIsImFsZyI6IlJTMjU2Iiwia2lkIjoiNjgxODVmZjEtNGU1MS00Y2U5LWFmMWMtNjg5ODEyMjAzMzE3In0.AQoAAAABAAUABwCAnli2_TzaSAgAgN57xEA92kgCAOCB-Bn0sMFPsi_-6hcM_dAVAAEAAAAYAAEAAAAKAAAADQAkAAAAMzZlYjhkMjYtMjlhMC00ZjI3LWFmOTYtZGUxZjQ0NDM0NGRlIgAkAAAAMzZlYjhkMjYtMjlhMC00ZjI3LWFmOTYtZGUxZjQ0NDM0NGRlMACA_ZRq2zzaSDcA3z38NkbRSUyWGDvYl4Ofxg.RVE6JxJy84yUNibCAjjX9xNNgO8RYErfdqNc7KcHTazujmZpOEO888p9ABWQ7HkqRuZLGWMDb2SMRsPs56ou0CoRq13N-19kIYXnIf1o19Pm-cke0ZddeQNXcNwgIzlYtF5autUdfj0GpfoDfBZ4TVrZVnIUKNeRSzTcRI4GKoth2deW6kJQibwTLotKShiLHgbkmHbQhbEDx53tiy_LqRZ1MJlMmFCuU2cFRWk8yurjuO_k-2ANzpliVux3ZoQGxn5JaeJ3pi1j1DyoU2SF7MIvqy4EaYfwuTm4MkBMEgyWmZxLQkOhZPjihbbkGgwIlhRJ1rgiAS3eVAC1b4rJSQ",
  basePath: basePath,
  accountId: "d49abe6c-b9b4-4d91-a032-79c071964ca4",
  integrationKey: "36eb8d26-29a0-4f27-af96-de1f444344de",
  secretKey: "e144adc0-508d-405f-88f6-952169b13e14",
};

module.exports = user;
