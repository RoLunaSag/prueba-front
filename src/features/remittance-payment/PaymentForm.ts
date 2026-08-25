import { createKeypad } from './Keypad';

export interface PaymentFormOptions {
  value: string;
  onDigit: (digit: string) => void;
  onDelete: () => void;
  onConfirm: () => void;
}

export const createPaymentForm = ({
  value,
  onDigit,
  onDelete,
  onConfirm,
}: PaymentFormOptions): HTMLElement => {
  const section = document.createElement('section');
  section.className = 'payment-form';
  section.setAttribute('aria-labelledby', 'payment-form-title');

  const heading = document.createElement('h1');
  heading.id = 'payment-form-title';
  heading.textContent = 'Remesas';

  const input = document.createElement('input');
  input.className = 'payment-form__input';
  input.type = 'text';
  input.value = value;
  input.placeholder = 'ID de remesa';
  input.readOnly = true;
  input.setAttribute('aria-label', 'ID de remesa capturado');

  section.append(heading, input, createKeypad({ onDigit, onDelete, onConfirm }));
  return section;
};
