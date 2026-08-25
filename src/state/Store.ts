import { initialRemittances } from '../data/Remittances';
import type { AppState } from '../types/AppState';
import { DEFAULT_PAGE_SIZE } from '../utils/Constants';

export const createInitialAppState = (): AppState => ({
  remittances: initialRemittances.map((remittance) => ({ ...remittance })),
  searchQuery: '',
  currentPage: 1,
  pageSize: DEFAULT_PAGE_SIZE,
  paymentInput: '',
  alert: null,
});
