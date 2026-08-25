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

const createListActionButton = (
  iconClass: string,
  ariaLabel: string,
  className = 'list-panel__action',
  onClick?: () => void,
): HTMLButtonElement => {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = className;
  button.setAttribute('aria-label', ariaLabel);

  const icon = document.createElement('i');
  icon.className = iconClass;
  icon.setAttribute('aria-hidden', 'true');
  button.append(icon);
  if (onClick) button.addEventListener('click', onClick);

  return button;
};

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
      isKeypadOpen: state.isKeypadOpen,
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

  const keypadButton = createListActionButton(
    'fa-solid fa-keyboard',
    state.isKeypadOpen ? 'Ocultar teclado numérico' : 'Mostrar teclado numérico',
    'list-panel__calendar-action',
    () => store.setState({ isKeypadOpen: !store.getState().isKeypadOpen }),
  );
  keypadButton.setAttribute('aria-expanded', String(state.isKeypadOpen));
  listHeader.append(date, keypadButton);

  const actions = document.createElement('div');
  actions.className = 'list-panel__actions';
  const searchButton = createListActionButton(
    'fa-solid fa-magnifying-glass',
    'Mostrar búsqueda de remesas',
    'list-panel__action',
    () => store.setState({ isSearchOpen: true }),
  );
  searchButton.setAttribute('aria-expanded', String(state.isSearchOpen));

  actions.append(
    searchButton,
    createListActionButton('fa-solid fa-filter', 'Filtrar remesas'),
    createListActionButton('fa-solid fa-print', 'Imprimir listado'),
  );

  listPanel.append(listHeader, actions);

  if (state.isSearchOpen) {
    listPanel.append(
      createSearchBar({
      value: state.searchQuery,
        onSearch: (searchQuery) =>
          store.setState({ searchQuery, currentPage: 1, isSearchOpen: false }),
      }),
    );
  }

  listPanel.append(
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
