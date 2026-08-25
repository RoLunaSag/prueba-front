import { describe, expect, it } from 'vitest';
import {
  selectPaginatedRemittances,
  selectSearchedRemittances,
  selectVisibleRemittances,
} from '../src/state/Selectors';
import type { AppState } from '../src/types/AppState';
import type { Remittance } from '../src/types/Remittance';

describe('Selectors', () => {
  const remittances: Remittance[] = [
    { id: '10000001', company: 'Western Union', amount: 12000, status: 'COBRADO', created_at: '20231001', charged_at: '20231005' },
    { id: '10000002', company: 'MoneyGram', amount: 8500, status: 'NO_COBRADO', created_at: '20231001', charged_at: null },
    { id: '10000003', company: 'Remitly', amount: 12000, status: 'COBRADO', created_at: '20231002', charged_at: '20231006' },
    { id: '10000004', company: 'Wise', amount: 6000, status: 'COBRADO', created_at: '20231002', charged_at: '20231004' },
  ];

  const createState = (overrides: Partial<AppState> = {}): AppState => ({
    remittances,
    searchQuery: '',
    isSearchOpen: false,
    isKeypadOpen: true,
    selectedSidebarItem: 'remittance',
    currentPage: 1,
    pageSize: 10,
    paymentInput: '',
    alert: null,
    ...overrides,
  });

  it('filtra remesas por identificador, compañía y monto', () => {
    expect(selectSearchedRemittances(remittances, '0003')).toHaveLength(1);
    expect(selectSearchedRemittances(remittances, 'western')).toHaveLength(1);
    expect(selectSearchedRemittances(remittances, '$12,000')).toHaveLength(2);
  });

  it('incluye solo cobradas y las ordena por fecha de cobro descendente', () => {
    const result = selectVisibleRemittances(createState());

    expect(result.items.map((remittance) => remittance.id)).toEqual([
      '10000003',
      '10000001',
      '10000004',
    ]);
  });

  it('pagina el resultado y ajusta una página solicitada fuera de rango', () => {
    const result = selectPaginatedRemittances(remittances, 3, 2);

    expect(result.currentPage).toBe(2);
    expect(result.totalPages).toBe(2);
    expect(result.items.map((remittance) => remittance.id)).toEqual(['10000003', '10000004']);
  });
});
