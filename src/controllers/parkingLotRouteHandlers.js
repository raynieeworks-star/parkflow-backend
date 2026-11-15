import { readFileHandler, writeFileHandler } from "../utils/fileStorage.js";
import { AppError } from "../utils/AppError.js";
import {
  filterDataHandler,
  findDataIndexHandler,
  searchDataHandler,
} from "../utils/reuseableFunctions.js";
import { genID } from "../utils/idGenerator.js";
import { parkingFeeCalculator } from "../utils/feeCalculator.js";

const getAllParkingSpace = async function (req, res, next) {
  try {
    const fileData = JSON.parse(await readFileHandler());
    const activeParkingLot = filterDataHandler(fileData, "status", "parked");

    res.status(200).json({
      status: "success",
      total: activeParkingLot.length,
      data: { activeParkingLot },
    });
  } catch (error) {
    return next(new AppError(404, "Failed to fetch all parking space data"));
  }
};
const getParkingSpaceByID = async function (req, res, next) {
  try {
    const { id } = req.params;

    if (!id || typeof id !== "string") {
      return next(new AppError(404, `Invalid ID ${id}`));
    }

    const fileData = JSON.parse(await readFileHandler());
    const dataMatched = searchDataHandler(fileData, "id", id);

    if (!dataMatched) {
      return next(new AppError(404, `Parking space not found`));
    }

    if (dataMatched.status === "parked") {
      return res.status(200).json({
        status: "success",
        message: "Parking space still in use",
        data: { dataMatched },
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Parking space is not in use",
      data: { dataMatched },
    });
  } catch (error) {
    return next(error);
  }
};

const createNewParkingSpace = async function (req, res, next) {
  try {
    const time = new Date().toISOString();
    const fileData = JSON.parse(await readFileHandler());

    const id = genID();

    const newVehicle = {
      id,
      numberPlate: req.body.numberPlate,
      modelNumber: req.body.modelNumber,
      parkingNumber: req.body.parkingNumber,
      status: "parked",
      parkingFee: 0,
      createdAt: time,
      updatedAt: time,
    };

    fileData.push(newVehicle);
    await writeFileHandler(fileData);

    res.status(201).json({
      status: "success",
      data: { newVehicle },
    });
  } catch (error) {
    return next(new AppError(400, `Failed to create a new parking space`));
  }
};

const modifyExistingParkingSpace = async function (req, res, next) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!id) {
      return next(new AppError(404, `parking lot with ID ${id}, not found`));
    }

    if (status !== "unparked") {
      return next(new AppError(400, `Status can only be unparked`));
    }

    const fileData = JSON.parse(await readFileHandler());

    const matchFound = searchDataHandler(fileData, "id", id);

    if (!matchFound) {
      return next(new AppError(404, `vehicle not found`));
    }

    const time = new Date().toISOString();

    const fee = parkingFeeCalculator(matchFound.createdAt, time);

    const modifiedData = {
      ...matchFound,
      status,
      fee,
      updatedAt: time,
    };

    const matchIndex = findDataIndexHandler(fileData, id);

    fileData.splice(matchIndex, 1, modifiedData);

    await writeFileHandler(fileData);

    return res.status(200).json({ status: "success", data: { modifiedData } });
  } catch (error) {
    return next(error);
  }
};

const deleteParkingSpaceByID = async function (req, res, next) {
  try {
    const { id } = req.params;

    if (!id) {
      return next(new AppError(404, `Parking space with ID ${id}, not found`));
    }

    const fileData = JSON.parse(await readFileHandler());

    const matchFound = searchDataHandler(fileData, "id", id);

    if (matchFound.status === "parked") {
      return next(
        new AppError(
          400,
          `You cannot delete a car record while it's still parked. Please unpark`,
        ),
      );
    }

    const matchIndex = findDataIndexHandler(fileData, id);

    fileData.splice(matchIndex, 1);

    await writeFileHandler(fileData);

    return res.status(200).json({
      status: "success",
      message: "Record deleted successfully",
    });
  } catch (error) {
    return next(new AppError(404, `Fail to delete record`));
  }
};

export const parkingSpaceHandler = {
  getAllParkingSpace,
  getParkingSpaceByID,
  createNewParkingSpace,
  modifyExistingParkingSpace,
  deleteParkingSpaceByID,
};
