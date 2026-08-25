import '@fortawesome/fontawesome-free/css/all.min.css';
import './styles/reset.css';
import './styles/tokens.css';
import './styles/layout.css';
import './styles/components.css';
import './styles/responsive.css';
import { createAlert } from './components/Alert';
import { createAppShell } from './components/AppShell';
import { createRemittanceList } from './components/RemittanceList';
import { createSearchBar } from './components/SearchBar';
import { createSidebar } from './components/Sidebar';
import { createTopbar } from './components/Topbar';
import { createPagination } from './features/remittance-list/Pagination';
import { createPaymentController } from './features/remittance-payment/PaymentController';
import { createPaymentForm } from './features/remittance-payment/PaymentForm';
import { selectVisibleRemittances } from './state/Selectors';
import { createStore } from './state/Store';

const root = document.querySelector<HTMLDivElement>('#app');

if (!root) {
  throw new Error('No se encontró el contenedor principal de la aplicación.');
}

const store = createStore();
const paymentController = createPaymentController(store);

const getTodayLabel = (): string =>
  new Intl.DateTimeFormat('es-MX', { day: 'numeric', month: 'long', year: 'numeric' }).format(
    new Date(),
  );

const render = (): void => {
  const state = store.getState();
  const visibleRemittances = selectVisibleRemittances(state);

  const content = document.createElement('div');
  content.className = 'main-screen';
  content.append(
    createTopbar({ user: { name: 'Elizabeth', role: 'Operador' } }),
  );

  if (state.alert) {
    content.append(
      createAlert({
        ...state.alert,
        onDismiss: () => store.setState({ alert: null }),
      }),
    );
  }

  const workspace = document.createElement('div');
  workspace.className = 'main-screen__workspace';
  workspace.append(
    createPaymentForm({
      value: state.paymentInput,
      onDigit: paymentController.appendDigit,
      onDelete: paymentController.deleteLastDigit,
      onConfirm: paymentController.charge,
    }),
  );

  const listPanel = document.createElement('section');
  listPanel.className = 'list-panel';

  const listHeader = document.createElement('div');
  listHeader.className = 'list-panel__header';
  const date = document.createElement('div');
  const today = document.createElement('strong');
  today.textContent = 'Hoy';
  const dateLabel = document.createElement('span');
  dateLabel.textContent = getTodayLabel();
  date.append(today, dateLabel);
  listHeader.append(date);

  listPanel.append(
    listHeader,
    createSearchBar({
      value: state.searchQuery,
      onSearch: (searchQuery) => store.setState({ searchQuery, currentPage: 1 }),
    }),
    createRemittanceList({ items: visibleRemittances.items }),
    createPagination({
      currentPage: visibleRemittances.currentPage,
      totalPages: visibleRemittances.totalPages,
      onPageChange: (currentPage) => store.setState({ currentPage }),
    }),
  );

  workspace.append(listPanel);
  content.append(workspace);

  root.replaceChildren(
    createAppShell({
      sidebar: createSidebar({ onMenuSelect: () => undefined }),
      content,
    }),
  );
};

store.subscribe(render);
render();
