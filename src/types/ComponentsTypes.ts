import type { RemittanceStatus } from './Remittance';
import type { RemittanceSortField, SortDirection } from './AppState';

export type AlertType = 'success' | 'error' | 'info';
export type ButtonType = 'primary' | 'secondary' | 'outline' | 'ghost' | 'keypad';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface AlertOptions {
  message: string;
  type?: AlertType;
  onDismiss?: () => void;
}

export interface AppShellOptions {
  sidebar: HTMLElement;
  content: HTMLElement;
}

export interface ButtonProps {
  label: string;
  onClick?: (event: MouseEvent) => void;
  bgcolor?: string;
  color?: string;
  size?: ButtonSize;
  type?: ButtonType;
}

export interface EmptyStateOptions {
  title: string;
  description?: string;
}

export interface FilterDropdownOptions {
  isOpen: boolean;
  field: Exclude<RemittanceSortField, 'charged_at'> | null;
  direction: SortDirection;
  onToggle: () => void;
  onFieldSelect: (field: Exclude<RemittanceSortField, 'charged_at'>) => void;
  onDirectionToggle: () => void;
}

export interface RemittanceListItem {
  id: string;
  company: string;
  amount: number;
}

export interface RemittanceListOptions {
  items: RemittanceListItem[];
  emptyMessage?: string;
  onRestore?: () => void;
}

export interface SearchBarOptions {
  placeholder?: string;
  value?: string;
  onSearch: (query: string) => void;
}

export interface SidebarMenuItem {
  id: string;
  label: string;
  iconClass: string;
}

export interface SidebarMenuOptions {
  items?: SidebarMenuItem[];
  activeItemId?: string;
  onSelect?: (itemId: string) => void;
}

export interface SidebarOptions {
  brand?: string;
  menuItems?: SidebarMenuItem[];
  activeItemId?: string;
  onMenuSelect?: (itemId: string) => void;
}

export interface StatusBadgeOptions {
  status: RemittanceStatus;
}

export interface TopbarOptions {
  title?: string;
  user: UserBoxOptions;
}

export interface UserBoxOptions {
  name: string;
  role: string;
  avatarUrl?: string;
  onNotificationsClick?: () => void;
}
