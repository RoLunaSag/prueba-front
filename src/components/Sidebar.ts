import { createSidebarMenu } from './SidebarMenu';
import { sidebarMenuItems } from './SidebarMenu';
import type { SidebarOptions } from '../types/ComponentsTypes';

export const createSidebar = ({
  brand = 'n09',
  menuItems = sidebarMenuItems,
  activeItemId,
  onMenuSelect,
}: SidebarOptions): HTMLElement => {
  const sidebar = document.createElement('div');
  sidebar.className = 'sidebar';

  const brandElement = document.createElement('a');
  brandElement.className = 'sidebar__brand';
  brandElement.href = '/';
  brandElement.textContent = brand;
  brandElement.setAttribute('aria-label', 'Ir al inicio');

  sidebar.append(
    brandElement,
    createSidebarMenu({
      items: menuItems,
      activeItemId,
      onSelect: onMenuSelect,
    }),
  );

  return sidebar;
};
