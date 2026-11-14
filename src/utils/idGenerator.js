import crypto from "crypto";

export const genID = function () {
  return crypto.randomUUID().replaceAll("-", "");
};