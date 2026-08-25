import { createKeypad } from './Keypad';

export interface PaymentFormOptions {
  value: string;
  isKeypadOpen: boolean;
  onDigit: (digit: string) => void;
  onDelete: () => void;
  onConfirm: () => void;
}

export const createPaymentForm = ({
  value,
  isKeypadOpen,
  onDigit,
  onDelete,
  onConfirm,
}: PaymentFormOptions): HTMLElement => {
  const section = document.createElement('section');
  section.className = 'payment-form';
  section.setAttribute('aria-labelledby', 'payment-form-title');

  const applicationTitle = document.createElement('h1');
  applicationTitle.className = 'payment-form__application-title';
  applicationTitle.textContent = 'Ventanilla Digital';

  const heading = document.createElement('h2');
  heading.className = 'payment-form__title';
  heading.id = 'payment-form-title';
  heading.textContent = 'Remesas';

  const input = document.createElement('input');
  input.className = 'payment-form__input';
  input.type = 'text';
  input.value = value;
  input.placeholder = 'ID de remesa';
  input.readOnly = true;
  input.setAttribute('aria-label', 'ID de remesa capturado');

  section.append(applicationTitle, heading, input);

  if (isKeypadOpen) {
    section.append(createKeypad({ onDigit, onDelete, onConfirm }));
  }

  return section;
};
