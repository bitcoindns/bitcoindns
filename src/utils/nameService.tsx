import axios from "axios";
import { sanitizeUrl } from "@braintree/sanitize-url";

const apiUrl = "https://xchain.io/api";

export type Record = {
  protocol: string;
  url: string;
  custom: string;
};

export type XChainAsset = {
  asset?: string;
  asset_id?: number;
  asset_longname?: string;
  description?: string;
  divisible?: boolean;
  estimated_value?: {
    btc: string;
    usd: string;
    xcp: string;
  };
  issuer?: string;
  locked?: boolean;
  owner?: string;
  supply?: number;
  type?: string;
  btcdns?: string;

  error?: string;
};

const fetchData = async (url: string) => {
  try {
    const { data } = await axios.get(url, {
      headers: {
        Accept: "application/json",
      },
    });

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.message;
    } else {
      return "An unexpected error occurred";
    }
  }
};

export const getJSON = (url: string) => {
  return fetchData(url);
};

export const getAsset = async (query: string): Promise<XChainAsset | any> => {
  return await fetchData(`${apiUrl}/asset/${query}`);
};

export const isRecord = (data: XChainAsset): Record | boolean => {
  let match: RegExpExecArray | null;
  let isJson: boolean = false;
  const btcdns: string = data.btcdns ?? "";
  const description: string = data.description ?? "";

  if ((match = RegExp(/(btcdns)\/(.*)/s).exec(description.toLowerCase())) || btcdns || (isJson = isJSON(description))) {
    const data: string = (match && match[2]) ?? btcdns ?? "";

    if (data || isJson) {
      let protocol = "",
        url = "",
        custom: string = "";

      switch (true) {
        case isJson:
          protocol = "json";
          // Append http:// because xchain supports json urls without it
          url = sanitizeUrl(setHttp(description));
          break;
        case isHTTP(data):
          protocol = "http";
          url = sanitizeUrl(data);
          break;
        case isEmail(data):
          protocol = "email";
          url = sanitizeUrl(data);
          break;

        default:
          protocol = "custom";
          custom = data;
          break;
      }

      return {
        protocol: protocol,
        url: url,
        custom: custom,
      };
    }
  }

  return false;
};

export const isHTTP = (url: string) => {
  return url.indexOf("http://") !== -1 || url.indexOf("https://") !== -1;
};

export const isEmail = (url: string) => {
  return url.indexOf("@") !== -1;
};

export const isJSON = (url: string) => {
  return url.indexOf(".json") !== -1;
};

export function setHttp(link: string) {
  if (link.search(/^http[s]?:\/\//) === -1) {
    link = "http://" + link;
  }
  return link;
}
