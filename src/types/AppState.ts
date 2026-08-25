import type { Remittance } from './Remittance';

export type AlertType = 'success' | 'error' | 'info';

export interface AppAlert {
  message: string;
  type: AlertType;
}

export interface AppState {
  remittances: Remittance[];
  searchQuery: string;
  isSearchOpen: boolean;
  isKeypadOpen: boolean;
  selectedSidebarItem: string;
  currentPage: number;
  pageSize: number;
  paymentInput: string;
  alert: AppAlert | null;
}
