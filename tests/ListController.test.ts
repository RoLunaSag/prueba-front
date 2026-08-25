import { afterEach, describe, expect, it, vi } from 'vitest';
import { createListController } from '../src/features/remittance-list/ListController';
import type { AlertManager } from '../src/state/AlertManager';
import { createInitialAppState, createStore } from '../src/state/Store';

const createAlertManager = (): AlertManager => ({
  show: vi.fn(),
  clear: vi.fn(),
  notifySearchResult: vi.fn(),
  notifyFilterApplied: vi.fn(),
  notifyAreaSelected: vi.fn(),
});

afterEach(() => vi.useRealTimers());

describe('ListController', () => {
  it('busca, cierra el buscador y notifica el resultado', () => {
    const store = createStore();
    const alertManager = createAlertManager();
    const controller = createListController(store, alertManager);

    controller.showSearch();
    controller.search('Western Union');

    expect(store.getState()).toMatchObject({
      searchQuery: 'Western Union',
      currentPage: 1,
      isSearchOpen: false,
    });
    expect(alertManager.notifySearchResult).toHaveBeenCalledWith(true);
  });

  it('aplica orden descendente y cierra el dropdown después de cinco segundos', () => {
    vi.useFakeTimers();
    const store = createStore();
    const alertManager = createAlertManager();
    const controller = createListController(store, alertManager);

    controller.toggleFilterDropdown();
    controller.selectSortField('amount');

    expect(store.getState()).toMatchObject({
      isFilterOpen: true,
      sortField: 'amount',
      sortDirection: 'desc',
    });
    expect(alertManager.notifyFilterApplied).toHaveBeenCalledOnce();

    vi.advanceTimersByTime(5000);
    expect(store.getState().isFilterOpen).toBe(false);
  });

  it('muestra un error al intentar imprimir una lista vacía', () => {
    const store = createStore({ ...createInitialAppState(), remittances: [] });
    const alertManager = createAlertManager();
    const controller = createListController(store, alertManager);

    controller.printFilteredList();

    expect(alertManager.show).toHaveBeenCalledWith('No se puede imprimir una lista vacia', 'error');
  });
});
