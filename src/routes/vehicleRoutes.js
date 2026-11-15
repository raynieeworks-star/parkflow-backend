import express from "express";
import { parkingSpaceHandler } from "../controllers/parkingLotRouteHandlers.js";
import { validatorHandler } from "../utils/validator.js";
import { vehicleServiceHandler } from "../services/vehicleService.js";

const router = express.Router();

router
  .route("/")
  .get(parkingSpaceHandler.getAllParkingSpace)
  .post(
    validatorHandler,
    vehicleServiceHandler,
    parkingSpaceHandler.createNewParkingSpace,
  );

router
  .route("/:id")
  .get(parkingSpaceHandler.getParkingSpaceByID)
  .patch(parkingSpaceHandler.modifyExistingParkingSpace)
  .delete(parkingSpaceHandler.deleteParkingSpaceByID);

export default router;
