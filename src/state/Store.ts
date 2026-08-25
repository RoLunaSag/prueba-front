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

export type StateUpdate = Partial<AppState> | ((state: AppState) => Partial<AppState>);
export type StoreListener = (state: AppState) => void;

export interface AppStore {
  getState: () => AppState;
  setState: (update: StateUpdate) => void;
  subscribe: (listener: StoreListener) => () => void;
}

export const createStore = (initialState = createInitialAppState()): AppStore => {
  let state = initialState;
  const listeners = new Set<StoreListener>();

  const notify = (): void => listeners.forEach((listener) => listener(state));

  return {
    getState: () => state,
    setState: (update) => {
      const patch = typeof update === 'function' ? update(state) : update;
      state = { ...state, ...patch };
      notify();
    },
    subscribe: (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
};
