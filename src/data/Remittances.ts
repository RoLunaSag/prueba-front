import type { Remittance } from '../types/Remittance';

export const initialRemittances: Remittance[] = [
  { id: '29003401', company: 'Western Union', amount: 12000, status: 'COBRADO', created_at: '20231001', charged_at: '20231006' },
  { id: '29003402', company: 'MoneyGram', amount: 8450, status: 'COBRADO', created_at: '20231001', charged_at: '20231006' },
  { id: '29003403', company: 'Remitly', amount: 13250, status: 'NO_COBRADO', created_at: '20231002', charged_at: null },
  { id: '29003404', company: 'Western Union', amount: 6800, status: 'COBRADO', created_at: '20231002', charged_at: '20231005' },
  { id: '29003405', company: 'Xoom', amount: 9250, status: 'NO_COBRADO', created_at: '20231002', charged_at: null },
  { id: '29003406', company: 'MoneyGram', amount: 15400, status: 'COBRADO', created_at: '20231003', charged_at: '20231005' },
  { id: '29003407', company: 'Wise', amount: 7100, status: 'COBRADO', created_at: '20231003', charged_at: '20231004' },
  { id: '29003408', company: 'Western Union', amount: 11000, status: 'NO_COBRADO', created_at: '20231003', charged_at: null },
  { id: '29003409', company: 'Remitly', amount: 9800, status: 'COBRADO', created_at: '20231004', charged_at: '20231004' },
  { id: '29003410', company: 'Xoom', amount: 6250, status: 'COBRADO', created_at: '20231004', charged_at: '20231004' },
  { id: '29003411', company: 'MoneyGram', amount: 18750, status: 'COBRADO', created_at: '20231004', charged_at: '20231003' },
  { id: '29003412', company: 'Wise', amount: 5200, status: 'NO_COBRADO', created_at: '20231005', charged_at: null },
  { id: '29003413', company: 'Western Union', amount: 14300, status: 'COBRADO', created_at: '20231005', charged_at: '20231003' },
  { id: '29003414', company: 'Remitly', amount: 7900, status: 'COBRADO', created_at: '20231005', charged_at: '20231002' },
  { id: '29003415', company: 'Xoom', amount: 11600, status: 'NO_COBRADO', created_at: '20231005', charged_at: null },
  { id: '29003416', company: 'MoneyGram', amount: 8900, status: 'COBRADO', created_at: '20231006', charged_at: '20231002' },
  { id: '29003417', company: 'Wise', amount: 10100, status: 'COBRADO', created_at: '20231006', charged_at: '20231001' },
  { id: '29003418', company: 'Western Union', amount: 7200, status: 'NO_COBRADO', created_at: '20231006', charged_at: null },
];
