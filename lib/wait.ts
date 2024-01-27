export const wait = async (ms: number) => {
  return new Promise((resolve, reject) => setTimeout(resolve, ms));
};
