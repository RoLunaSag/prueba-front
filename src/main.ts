import '@fortawesome/fontawesome-free/css/all.min.css';
import './styles/reset.css';
import './styles/tokens.css';
import './styles/layout.css';
import './styles/components.css';
import './styles/responsive.css';
import { createAlert } from './components/Alert';
import { createAppShell } from './components/AppShell';
import { createFilterDropdown } from './components/FilterDropdown';
import { createRemittanceList } from './components/RemittanceList';
import { createSearchBar } from './components/SearchBar';
import { createSidebar } from './components/Sidebar';
import { createTopbar } from './components/Topbar';
import userElizabethAvatar from '../assets/images/user-elizabeth.jpg';
import { createPagination } from './features/remittance-list/Pagination';
import { createPaymentController } from './features/remittance-payment/PaymentController';
import { createPaymentForm } from './features/remittance-payment/PaymentForm';
import { sidebarMenuItems } from './components/SidebarMenu';
import { createAlertManager } from './state/AlertManager';
import { selectVisibleRemittances } from './state/Selectors';
import { createStore } from './state/Store';

const root = document.querySelector<HTMLDivElement>('#app');

if (!root) {
  throw new Error('No se encontró el contenedor principal de la aplicación.');
}

const store = createStore();
const alertManager = createAlertManager(store);
const paymentController = createPaymentController(store, alertManager);
let isPaymentPanelOpen = true;
let filterCloseTimer: ReturnType<typeof setTimeout> | undefined;

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

const togglePaymentPanel = (): void => {
  isPaymentPanelOpen = !isPaymentPanelOpen;

  const workspace = root.querySelector<HTMLElement>('.main-screen__workspace');
  workspace?.classList.toggle('main-screen__workspace--keypad-hidden', !isPaymentPanelOpen);

  const keyboardButton = root.querySelector<HTMLButtonElement>('.list-panel__keyboard-action');
  keyboardButton?.setAttribute('aria-expanded', String(isPaymentPanelOpen));
  keyboardButton?.setAttribute(
    'aria-label',
    isPaymentPanelOpen ? 'Ocultar panel de teclado' : 'Mostrar panel de teclado',
  );
};

const scheduleFilterClose = (): void => {
  if (filterCloseTimer) clearTimeout(filterCloseTimer);

  filterCloseTimer = setTimeout(() => {
    store.setState({ isFilterOpen: false });
    filterCloseTimer = undefined;
  }, 5000);
};

const toggleFilterDropdown = (): void => {
  const isFilterOpen = store.getState().isFilterOpen;

  if (filterCloseTimer) clearTimeout(filterCloseTimer);
  filterCloseTimer = undefined;
  store.setState({ isFilterOpen: !isFilterOpen });

  if (!isFilterOpen) scheduleFilterClose();
};

const render = (): void => {
  const state = store.getState();
  const visibleRemittances = selectVisibleRemittances(state);

  const content = document.createElement('div');
  content.className = 'main-screen';

  const workspace = document.createElement('div');
  workspace.className = 'main-screen__workspace';
  if (!isPaymentPanelOpen) workspace.classList.add('main-screen__workspace--keypad-hidden');
  workspace.append(
    createPaymentForm({
      value: state.paymentInput,
      onDigit: paymentController.appendDigit,
      onDelete: paymentController.deleteLastDigit,
      onConfirm: paymentController.charge,
    }),
  );

  const rightColumn = document.createElement('div');
  rightColumn.className = 'main-screen__right-column';
  rightColumn.append(
    createTopbar({
      user: {
        name: 'Elizabeth',
        role: 'Operador',
        avatarUrl: userElizabethAvatar,
        onNotificationsClick: () => alertManager.show('No hay notificaciones', 'error'),
      },
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
    isPaymentPanelOpen ? 'Ocultar panel de teclado' : 'Mostrar panel de teclado',
    'list-panel__calendar-action list-panel__keyboard-action',
    togglePaymentPanel,
  );
  keypadButton.setAttribute('aria-expanded', String(isPaymentPanelOpen));
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
    createFilterDropdown({
      isOpen: state.isFilterOpen,
      field: state.sortField === 'charged_at' ? null : state.sortField,
      direction: state.sortDirection,
      onToggle: toggleFilterDropdown,
      onFieldSelect: (sortField) => {
        store.setState({ sortField, sortDirection: 'desc', currentPage: 1 });
        scheduleFilterClose();
        alertManager.notifyFilterApplied();
      },
      onDirectionToggle: () => {
        const currentDirection = store.getState().sortDirection;
        store.setState({
          sortDirection: currentDirection === 'desc' ? 'asc' : 'desc',
          currentPage: 1,
        });
        scheduleFilterClose();
        alertManager.notifyFilterApplied();
      },
    }),
    createListActionButton('fa-solid fa-print', 'Imprimir listado'),
  );

  listPanel.append(listHeader, actions);

  if (state.isSearchOpen) {
    listPanel.append(
      createSearchBar({
      value: state.searchQuery,
        onSearch: (searchQuery) => {
          const nextState = { ...store.getState(), searchQuery, currentPage: 1 };
          const hasResults = selectVisibleRemittances(nextState).totalItems > 0;

          store.setState({ searchQuery, currentPage: 1, isSearchOpen: false });
          alertManager.notifySearchResult(hasResults);
        },
      }),
    );
  }

  listPanel.append(
    createRemittanceList({
      items: visibleRemittances.items,
      onRestore: state.searchQuery
        ? () => store.setState({ searchQuery: '', currentPage: 1 })
        : undefined,
    }),
    createPagination({
      currentPage: visibleRemittances.currentPage,
      totalPages: visibleRemittances.totalPages,
      onPageChange: (currentPage) => store.setState({ currentPage }),
    }),
  );

  rightColumn.append(listPanel);
  workspace.append(rightColumn);
  content.append(workspace);

  if (state.alert) {
    content.append(
      createAlert({
        ...state.alert,
        onDismiss: alertManager.clear,
      }),
    );
  }

  root.replaceChildren(
    createAppShell({
      sidebar: createSidebar({
        activeItemId: state.selectedSidebarItem,
        onMenuSelect: (itemId) => {
          const area = sidebarMenuItems.find((item) => item.id === itemId)?.label ?? itemId;
          store.setState({ selectedSidebarItem: itemId });
          alertManager.notifyAreaSelected(area);
        },
      }),
      content,
    }),
  );
};

store.subscribe(render);
render();
