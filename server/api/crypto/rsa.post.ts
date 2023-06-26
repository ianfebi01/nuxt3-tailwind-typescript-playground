import crypto from "node:crypto";
import { getQuery, readBody } from "h3";

const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
  modulusLength: 2048,
  publicKeyEncoding: {
    type: "pkcs1",
    format: "pem",
  },
  privateKeyEncoding: {
    type: "pkcs1",
    format: "pem",
  },
});
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const chipertext: string = await encryptMessage(body);
  const originaltext: string = await decryptData(chipertext);
  return {
    chipertext,
    originaltext,
  };
});

function encryptMessage(message: string) {
  const encryptData = crypto.publicEncrypt(
    {
      key: publicKey,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: "sha256",
    },
    Buffer.from(message)
  );
  return encryptData.toString("base64");
}

function decryptData(encryptedMessage: string) {
  const bufferData = Buffer.from(encryptedMessage, "base64");
  const decryptedData = crypto.privateDecrypt(
    {
      key: privateKey,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: "sha256",
    },
    bufferData
  );
  return decryptedData.toString();
}
