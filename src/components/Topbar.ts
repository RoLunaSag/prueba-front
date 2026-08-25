import { createUserBox } from './UserBox';
import type { UserBoxOptions } from './UserBox';

export interface TopbarOptions {
  title: string;
  user: UserBoxOptions;
}

export const createTopbar = ({ title, user }: TopbarOptions): HTMLElement => {
  const topbar = document.createElement('header');
  topbar.className = 'topbar';

  const titleElement = document.createElement('h1');
  titleElement.className = 'topbar__title';
  titleElement.textContent = title;

  topbar.append(titleElement, createUserBox(user));
  return topbar;
};
