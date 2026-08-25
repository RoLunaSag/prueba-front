export interface SidebarMenuItem {
  id: string;
  label: string;
  iconClass: string;
}

export interface SidebarMenuOptions {
  items: SidebarMenuItem[];
  activeItemId?: string;
  onSelect?: (itemId: string) => void;
}

export const createSidebarMenu = ({
  items,
  activeItemId,
  onSelect,
}: SidebarMenuOptions): HTMLElement => {
  const navigation = document.createElement('nav');
  navigation.className = 'sidebar-menu';
  navigation.setAttribute('aria-label', 'Navegación principal');

  const list = document.createElement('ul');
  list.className = 'sidebar-menu__items';

  items.forEach(({ id, label, iconClass }) => {
    const listItem = document.createElement('li');
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'sidebar-menu__button';
    button.setAttribute('aria-label', label);
    if (id === activeItemId) button.setAttribute('aria-current', 'page');

    const icon = document.createElement('i');
    icon.className = iconClass;
    icon.setAttribute('aria-hidden', 'true');

    button.append(icon);
    button.addEventListener('click', () => onSelect?.(id));
    listItem.append(button);
    list.append(listItem);
  });

  navigation.append(list);
  return navigation;
};
