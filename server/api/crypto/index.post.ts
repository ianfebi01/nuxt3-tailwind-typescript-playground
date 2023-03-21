import { getQuery, readBody } from "h3";
import AES from "crypto-js/aes";
// const AES = require("crypto-js/aes");

import CryptoJS from "crypto-js";

export default defineEventHandler(async (event) => {
  const SECRET = "IANGG";
  const body = await readBody(event);

  // Excrypt
  const chipertext: string = AES.encrypt(body, SECRET).toString();

  // decrypt
  const bytes = AES.decrypt(chipertext, SECRET);
  const originaltext: string = bytes.toString(CryptoJS.enc.Utf8);
  interface Result {
    chipertext?: string;
    originaltext?: string;
  }

  const result: Result = {
    chipertext,
    originaltext,
  };

  return result;
});
