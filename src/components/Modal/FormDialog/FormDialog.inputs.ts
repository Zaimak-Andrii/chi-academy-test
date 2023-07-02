import type { ICarForm } from '@/types/cars.types';

export const inputs: {
  name: keyof ICarForm;
  label: string;
  type: HTMLInputElement['type'];
  canDisabled: boolean;
  startAdornment?: string;
}[] = [
  { name: 'company', label: 'Company', type: 'text', canDisabled: true },
  { name: 'model', label: 'Model', type: 'text', canDisabled: true },
  { name: 'vin', label: 'VIN-code', type: 'text', canDisabled: true },
  { name: 'year', label: 'Year', type: 'number', canDisabled: true },
  { name: 'color', label: 'Color', type: 'text', canDisabled: false },
  { name: 'price', label: 'Price', type: 'number', canDisabled: false, startAdornment: '$' },
];
