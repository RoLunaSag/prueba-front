import type { EmptyStateOptions } from '../types/ComponentsTypes';

export const createEmptyState = ({ title, description }: EmptyStateOptions): HTMLElement => {
  const container = document.createElement('section');
  container.className = 'empty-state';

  const titleElement = document.createElement('h2');
  titleElement.className = 'empty-state__title';
  titleElement.textContent = title;
  container.append(titleElement);

  if (description) {
    const descriptionElement = document.createElement('p');
    descriptionElement.className = 'empty-state__description';
    descriptionElement.textContent = description;
    container.append(descriptionElement);
  }

  return container;
};
