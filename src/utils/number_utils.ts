/* eslint-disable @typescript-eslint/no-explicit-any */
export const isNumber = (str: any): boolean => {
  return typeof str === 'number' || (typeof str === 'string' && str.length > 0 && !isNaN(Number(str)));
};
