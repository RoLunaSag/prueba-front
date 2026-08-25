import type { AppStore } from '../../state/Store';
import { MAX_REMITTANCE_ID_LENGTH } from '../../utils/Constants';
import { chargeRemittance } from '../../services/RemittanceService';

export const createPaymentController = (store: AppStore) => ({
  appendDigit: (digit: string): void => {
    const { paymentInput } = store.getState();

    if (paymentInput.length >= MAX_REMITTANCE_ID_LENGTH) {
      store.setState({
        alert: {
          type: 'error',
          message: `El ID de remesa no puede tener más de ${MAX_REMITTANCE_ID_LENGTH} caracteres.`,
        },
      });
      return;
    }

    store.setState({ paymentInput: `${paymentInput}${digit}`, alert: null });
  },
  deleteLastDigit: (): void => {
    const { paymentInput } = store.getState();
    store.setState({ paymentInput: paymentInput.slice(0, -1), alert: null });
  },
  charge: (): void => {
    const state = store.getState();
    const result = chargeRemittance(state.remittances, state.paymentInput);

    if (!result.success) {
      store.setState({ alert: { type: 'error', message: result.error } });
      return;
    }

    store.setState({
      remittances: result.remittances,
      paymentInput: '',
      searchQuery: '',
      isSearchOpen: false,
      currentPage: 1,
      alert: { type: 'success', message: `La remesa ${result.remittance.id} fue cobrada.` },
    });
  },
});
