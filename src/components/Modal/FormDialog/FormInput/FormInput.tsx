import { TextField, TextFieldProps } from '@mui/material';
import { forwardRef } from 'react';

export const FormInput = forwardRef<HTMLInputElement, TextFieldProps>((props, ref) => (
  <TextField ref={ref} variant="outlined" fullWidth size="small" {...props} />
));

export default FormInput;
