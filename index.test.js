// https://dev.to/zaklaughton/the-only-3-steps-you-need-to-mock-an-api-call-in-jest-39mb
const { default: axios } = require("axios");
const result = require("./index.js");

jest.mock("axios");
describe("Test US addresses", function () {
  it("should be a valid address", async function () {
    axios.get.mockResolvedValue("");
  });
});
