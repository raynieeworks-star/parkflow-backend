import { readFileHandler } from "../utils/fileStorage.js";
import {
  filterDataHandler,
  searchDataHandler,
  isSpaceInUseHandler,
} from "../utils/reuseableFunctions.js";
import { AppError } from "../utils/AppError.js";

export const vehicleServiceHandler = async function (req, res, next) {
  try {
    const { numberPlate, parkingNumber } = req.body;
    //read data from data folder
    const fileData = await readFileHandler();

    //filter out vehicles with parked status
    const spacesInUse = filterDataHandler(fileData, "status", "parked");

    //check if the vehicle already exists in the database to prevent duplicate data
    const vehicleAlreadyExists = searchDataHandler(
      spacesInUse,
      "numberPlate",
      numberPlate,
    );

    if (vehicleAlreadyExists) {
      next(new AppError(400, "Vehicle is already parked"));
    }

    //check if a space is in use or free
    const isSpaceInUse = isSpaceInUseHandler(
      spacesInUse,
      "parkingNumber",
      parkingNumber,
    );

    if (isSpaceInUse) {
      next(
        new AppError(
          400,
          "space already in use, opt for another parking space number",
        ),
      );
    }
    next();
  } catch (error) {
    next(error);
  }
};
