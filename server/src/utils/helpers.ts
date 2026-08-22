export const generateEmployeeId = (
  companyName: string,
  firstName: string,
  lastName: string,
  serialNumber: number
): string => {
  const companyPrefix = companyName.substring(0, 2).toUpperCase();
  
  const fNamePrefix = firstName.substring(0, 1).toUpperCase();
  const lNamePrefix = lastName.substring(0, 1).toUpperCase();
  const namePrefix = `${fNamePrefix}${lNamePrefix}`;
  
  const year = new Date().getFullYear();
  
  // Pad serial number to 4 digits (e.g. 1 -> 0001)
  const paddedSerial = serialNumber.toString().padStart(4, '0');
  
  return `${companyPrefix}${namePrefix}${year}${paddedSerial}`;
};

export const generateRandomPassword = (): string => {
  return Math.random().toString(36).slice(-8); // simple 8 char password
};
