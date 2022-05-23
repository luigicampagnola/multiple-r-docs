const docusign = require("docusign-esign");
const restApi = docusign.ApiClient.RestApi;

const basePath = restApi.BasePath.DEMO;

const user = {
  accessToken:
    "eyJ0eXAiOiJNVCIsImFsZyI6IlJTMjU2Iiwia2lkIjoiNjgxODVmZjEtNGU1MS00Y2U5LWFmMWMtNjg5ODEyMjAzMzE3In0.AQoAAAABAAUABwCAeQJkOjzaSAgAgLklcn082kgCAOCB-Bn0sMFPsi_-6hcM_dAVAAEAAAAYAAEAAAAFAAAADQAkAAAAMzZlYjhkMjYtMjlhMC00ZjI3LWFmOTYtZGUxZjQ0NDM0NGRlIgAkAAAAMzZlYjhkMjYtMjlhMC00ZjI3LWFmOTYtZGUxZjQ0NDM0NGRlMAAAYiEGOTzaSDcA3z38NkbRSUyWGDvYl4Ofxg.yc_YzI80Xm4J4k1725yOZHWXIQbDyQk0HuPuHE86zOQQzvuJnNADVm9L2kezSMuNe8Jlw-YFOnFOb8Kg-enbJcYQjrMaiz7w02Vq_fYJzwja98XNJCajJ7WN8VKpNinKEuTkJfNQ9XwV1sm0ms5yaj4zqLcua-tUf_8WoWGNsxn7clVW4cOOMr3x5lH1rRs377YQGsmZNGypCbe7o-8gBPqOLVTZ5HcMIMIGhzvdg4Q-B4r96BAczr5e7SxdJHxozkEvJrbpPqNb5-XGf5EOK4cKg-AqpBPnWrKHODaKYnwFDD80ps9i81Ud2GJVjkTOgyOQ9rOVGE0FvmdibUCdVQ",
  basePath: basePath,
  accountId: "d49abe6c-b9b4-4d91-a032-79c071964ca4",
  integrationKey: "36eb8d26-29a0-4f27-af96-de1f444344de",
  secretKey: "e144adc0-508d-405f-88f6-952169b13e14",
};

module.exports = user;
