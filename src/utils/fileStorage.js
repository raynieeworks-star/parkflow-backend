import path from "node:path";
import { readFile, writeFile } from "node:fs";
import { promisify } from "node:util";
const dirName = import.meta.dirname;

import { AppError } from "../utils/AppError.js";

const filePath = path.join(dirName, "..", "..", "data", "vehicle.json");

const readFromFile = promisify(readFile);
const writeToFile = promisify(writeFile);

export const readFileHandler = async function () {
  try {
    return await readFromFile(filePath, "utf-8");
  } catch (error) {
    throw new AppError(500, `Could not read file: ${error.message}`);
  }
};

export const writeFileHandler = async function (file) {
  try {
    await writeToFile(filePath, JSON.stringify(file, null, 2));
  } catch (error) {
    throw new AppError(500, `Failed to write file: ${error.message}`);
  }
};
