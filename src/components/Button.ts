export type ButtonVariant = 'primary' | 'secondary' | 'icon';

export interface ButtonOptions {
  label: string;
  variant?: ButtonVariant;
  type?: 'button' | 'submit' | 'reset';
  iconClass?: string;
  ariaLabel?: string;
  disabled?: boolean;
  onClick?: (event: MouseEvent) => void;
}

export const createButton = ({
  label,
  variant = 'secondary',
  type = 'button',
  iconClass,
  ariaLabel,
  disabled = false,
  onClick,
}: ButtonOptions): HTMLButtonElement => {
  const button = document.createElement('button');
  button.type = type;
  button.className = `button button--${variant}`;
  button.disabled = disabled;
  button.textContent = label;

  if (ariaLabel) button.setAttribute('aria-label', ariaLabel);

  if (iconClass) {
    const icon = document.createElement('i');
    icon.className = iconClass;
    icon.setAttribute('aria-hidden', 'true');
    button.prepend(icon);
  }

  if (onClick) button.addEventListener('click', onClick);

  return button;
};
