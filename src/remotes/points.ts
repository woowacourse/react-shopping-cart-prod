import { auth } from '../constants/auth';
import Fetcher from './Fetcher';
import { ERROR_MESSAGES } from '../constants/errorMessages';
import { isCurrentPoints, isSavedPoints } from '../types/typeGuards';
import { CurrentPoints, SavedPoints } from '../types/points';

export const fetchCurrentPoints = async (url: string) => {
  const { value } = await Fetcher.fetch<CurrentPoints>({
    url,
    auth: `Basic ${auth}`,
    method: 'GET',
    typeGuard: isCurrentPoints,
    errorMessages: ERROR_MESSAGES.getCurrentPoints,
  });

  return value.points;
};

export const fetchSavedPoints = async (url: string) => {
  const { value } = await Fetcher.fetch<SavedPoints>({
    url,
    auth: `Basic ${auth}`,
    method: 'GET',
    typeGuard: isSavedPoints,
    errorMessages: ERROR_MESSAGES.getOrderPoints,
  });

  return value.points_saved;
};
