import { ERROR_MESSAGE } from '../data/errors';
import { PATTERN } from '../data/patterns';
import { EValidate } from '../data/types';

export const validate = (
  str: string,
  setError: React.Dispatch<React.SetStateAction<string>>,
  option: EValidate,
  message: string
) => {
  const result = str.match(PATTERN[option]);
  setError(result ? ERROR_MESSAGE.CLEAR : message);
  return result;
};
