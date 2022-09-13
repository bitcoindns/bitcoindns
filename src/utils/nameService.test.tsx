import * as NS from "./nameService";
import axios from "axios";

describe("isHTTP", () => {
  it("Checks for a http/https url", () => {
    expect(NS.isHTTP("https://xchain.io")).toBeTruthy();
    expect(NS.isHTTP("xchain.io")).toBeFalsy();
  });
});

describe("isEmail", () => {
  it("Checks for an email", () => {
    expect(NS.isEmail("test@gmail.com")).toBeTruthy();
    expect(NS.isEmail("test(at)gmail.com")).toBeFalsy();
  });
});

describe("isJSON", () => {
  it("Checks for a json url", () => {
    expect(NS.isJSON("https://phockheads.com/phockheads.json")).toBeTruthy();
    expect(NS.isJSON("phockheads.com/phockheads.json")).toBeTruthy();
    expect(NS.isJSON("https://xchain.io")).toBeFalsy();
  });
});

describe("setHttp", () => {
  it("Sets a missing `http` in a link", () => {
    expect(NS.setHttp("xchain.json")).toEqual("http://xchain.json");
    expect(NS.setHttp("http://xchain.json")).toEqual("http://xchain.json");
    expect(NS.setHttp("https://xchain.json")).toEqual("https://xchain.json");
  });
});

describe("isRecord", () => {
  it("Checks for a Bitcoin DNS record", () => {
    expect(NS.isRecord({ description: "btcdns/https://xchain.io" })).toEqual({
      url: "https://xchain.io",
      protocol: "http",
      custom: "",
    });
    expect(NS.isRecord({ description: "btcdns/test@gmail.com" })).toEqual({
      url: "test@gmail.com",
      protocol: "email",
      custom: "",
    });
    expect(NS.isRecord({ description: "https://phockheads.com/phockheads.json" })).toEqual({
      url: "https://phockheads.com/phockheads.json",
      protocol: "json",
      custom: "",
    });
    expect(NS.isRecord({ description: "phockheads.com/phockheads.json" })).toEqual({
      url: "http://phockheads.com/phockheads.json",
      protocol: "json",
      custom: "",
    });
    expect(NS.isRecord({ description: "test@gmail.com" })).toBeFalsy();
    expect(NS.isRecord({ description: "https://xchain.io" })).toBeFalsy();
    expect(NS.isRecord({ description: "btcdns/" })).toBeFalsy();
    expect(NS.isRecord({ description: "btcdns/xchain" })).toEqual({
      url: "",
      protocol: "custom",
      custom: "xchain",
    });
    expect(NS.isRecord({ description: "BTCDNS/https://xchain.io" })).toEqual({
      url: "https://xchain.io",
      protocol: "http",
      custom: "",
    });
  });
});

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("getAsset", () => {
  it("Gets asset data", async () => {
    mockedAxios.get
      .mockImplementationOnce(() =>
        Promise.resolve({
          status: 200,
          data: {
            description: "btcdns/https://xchain.io",
          },
        })
      )
      .mockImplementationOnce(() =>
        Promise.resolve({
          status: 200,
          data: {
            description: "btcdns/test@gmail.com",
          },
        })
      )
      .mockImplementationOnce(() =>
        Promise.resolve({
          status: 200,
          data: {
            description: "phockheads.com",
          },
        })
      )
      .mockImplementationOnce(() =>
        Promise.resolve({
          status: 200,
          data: {
            description: "btcdns/phocks",
          },
        })
      );

    let result = await NS.getAsset("bitcoindns");
    expect(NS.isJSON(result.description)).toBeFalsy();
    expect(NS.isRecord(result)).toEqual({
      url: "https://xchain.io",
      protocol: "http",
      custom: "",
    });

    result = await NS.getAsset("btcdns");
    expect(NS.isEmail(result.description)).toBeTruthy();
    expect(NS.isRecord(result)).toEqual({
      url: "test@gmail.com",
      protocol: "email",
      custom: "",
    });

    result = await NS.getAsset("phockheads");
    expect(NS.isRecord(result)).toBeFalsy();

    result = await NS.getAsset("phockheads");
    expect(NS.isRecord(result)).toEqual({
      url: "",
      protocol: "custom",
      custom: "phocks",
    });

    mockedAxios.get.mockClear();
  });
});

describe("getJSON", () => {
  it("Gets JSON data", async () => {
    mockedAxios.get
      .mockImplementationOnce(() =>
        Promise.resolve({
          status: 200,
          data: {
            btcdns: "https://xchain.io",
            description: "Cool asset",
          },
        })
      )
      .mockImplementationOnce(() =>
        Promise.resolve({
          status: 404,
          data: null,
        })
      );

    let result = await NS.getJSON("https://server.com/db/asset.json");
    expect(NS.isHTTP(result.btcdns)).toBeTruthy();
    expect(result.btcdns).toEqual("https://xchain.io");
    expect(NS.isRecord(result)).toEqual({
      url: "https://xchain.io",
      protocol: "http",
      custom: "",
    });

    result = await NS.getJSON("https://server.com/db/asset.json");
    expect(result).toBeNull();

    mockedAxios.get.mockClear();
  });
});
