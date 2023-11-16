import { IUppercasedJson } from 'types';

export function lowercaseJsonKeys(json: IUppercasedJson): IUppercasedJson {
  if (typeof json !== 'object' || json === null) {
    return json;
  }

  if (Array.isArray(json)) {
    return json.map((item) => lowercaseJsonKeys(item));
  }

  const result: IUppercasedJson = {};

  for (const key in json) {
    if (json.hasOwnProperty(key)) {
      const lowercasedKey = key.toLowerCase();
      result[lowercasedKey] = lowercaseJsonKeys(json[key]);
    }
  }

  return result;
}
