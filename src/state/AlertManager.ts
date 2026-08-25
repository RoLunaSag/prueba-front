import type { AppStore } from './Store';
import type { AlertType } from '../types/AppState';

export const createAlertManager = (store: AppStore) => ({
  show: (message: string, type: AlertType = 'info'): void => {
    store.setState({ alert: { message, type } });
  },
  clear: (): void => {
    store.setState({ alert: null });
  },
  notifySearchResult: (hasResults: boolean): void => {
    store.setState({
      alert: hasResults
        ? { type: 'success', message: 'Búsqueda completa' }
        : { type: 'info', message: 'No hay resultados de esta búsqueda' },
    });
  },
  notifyFilterApplied: (): void => {
    store.setState({ alert: { type: 'info', message: 'Filtro aplicado' } });
  },
  notifyAreaSelected: (area: string): void => {
    store.setState({ alert: { type: 'info', message: `${area} Seleccionado` } });
  },
});
