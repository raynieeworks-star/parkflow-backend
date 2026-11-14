export const validatorHandler = async function (req, res, next) {
  try {
    const { numberPlate, modelNumber, parkingNumber } = req.body;

    if (
      !numberPlate ||
      typeof numberPlate !== "string" ||
      numberPlate.trim() === ""
    ) {
      return res.status(400).json({
        status: "fail",
        message: "please provide a valid number plate",
      });
    }
    if (
      !modelNumber ||
      typeof modelNumber !== "string" ||
      modelNumber.trim() === ""
    ) {
      return res.status(400).json({
        status: "fail",
        message: "please provide a valid vehicle model number",
      });
    }

    if (
      !parkingNumber ||
      !Number.isInteger(parkingNumber) ||
      parkingNumber < 1
    ) {
      return res.status(400).json({
        status: "fail",
        message: "please provide a valid parking number",
      });
    }

    next();
  } catch (error) {
    next(error);
  }
};
