import type { AlertManager } from '../../state/AlertManager';
import type { AppStore } from '../../state/Store';
import {
  selectVisibleRemittances,
  type PaginatedRemittances,
} from '../../state/Selectors';
import type { RemittanceSortField } from '../../types/AppState';

type ListSortField = Exclude<RemittanceSortField, 'charged_at'>;

export interface ListController {
  getVisibleRemittances: () => PaginatedRemittances;
  showSearch: () => void;
  search: (searchQuery: string) => void;
  restoreSearch: () => void;
  changePage: (currentPage: number) => void;
  toggleFilterDropdown: () => void;
  selectSortField: (sortField: ListSortField) => void;
  toggleSortDirection: () => void;
  dispose: () => void;
}

export const createListController = (
  store: AppStore,
  alertManager: AlertManager,
): ListController => {
  let filterCloseTimer: ReturnType<typeof setTimeout> | undefined;

  const scheduleFilterClose = (): void => {
    if (filterCloseTimer) clearTimeout(filterCloseTimer);

    filterCloseTimer = setTimeout(() => {
      store.setState({ isFilterOpen: false });
      filterCloseTimer = undefined;
    }, 5000);
  };

  return {
    getVisibleRemittances: () => selectVisibleRemittances(store.getState()),
    showSearch: (): void => store.setState({ isSearchOpen: true }),
    search: (searchQuery): void => {
      const nextState = { ...store.getState(), searchQuery, currentPage: 1 };
      const hasResults = selectVisibleRemittances(nextState).totalItems > 0;

      store.setState({ searchQuery, currentPage: 1, isSearchOpen: false });
      alertManager.notifySearchResult(hasResults);
    },
    restoreSearch: (): void => store.setState({ searchQuery: '', currentPage: 1 }),
    changePage: (currentPage): void => store.setState({ currentPage }),
    toggleFilterDropdown: (): void => {
      const isFilterOpen = store.getState().isFilterOpen;

      if (filterCloseTimer) clearTimeout(filterCloseTimer);
      filterCloseTimer = undefined;
      store.setState({ isFilterOpen: !isFilterOpen });

      if (!isFilterOpen) scheduleFilterClose();
    },
    selectSortField: (sortField): void => {
      store.setState({ sortField, sortDirection: 'desc', currentPage: 1 });
      scheduleFilterClose();
      alertManager.notifyFilterApplied();
    },
    toggleSortDirection: (): void => {
      const { sortDirection } = store.getState();
      store.setState({
        sortDirection: sortDirection === 'desc' ? 'asc' : 'desc',
        currentPage: 1,
      });
      scheduleFilterClose();
      alertManager.notifyFilterApplied();
    },
    dispose: (): void => {
      if (filterCloseTimer) clearTimeout(filterCloseTimer);
      filterCloseTimer = undefined;
    },
  };
};
