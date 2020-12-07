import { environment } from '../config/endpoints';

export const endpoint = (route: string): string => {
  return `${environment}/${route}`;
};
