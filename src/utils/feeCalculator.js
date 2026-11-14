const parkingFeePerHour = 500;

export const parkingFeeCalculator = function (createdAt, updatedAt) {
  const totalParkingTime = new Date(updatedAt) - new Date(createdAt);

  if (totalParkingTime === 0) return 0;

  const parkingDuration = Math.ceil(totalParkingTime / (1000 * 60 * 60));
  return parkingDuration * parkingFeePerHour;
};
