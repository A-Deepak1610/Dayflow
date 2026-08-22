// Utility functions helper

export const formatResponse = <T>(data: T, message?: string) => ({
  success: true,
  message,
  data,
});
