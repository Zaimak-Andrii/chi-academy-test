import { forwardRef } from 'react';
import { FormControlLabel, Switch, SwitchProps } from '@mui/material';

type Props = SwitchProps & {
  value: boolean;
  label: string;
};

export const FormSwitch = forwardRef<JSX.Element, Props>((props, ref) => (
  <FormControlLabel
    ref={ref}
    control={<Switch color="primary" checked={props.value} {...props} />}
    label={props.label}
    labelPlacement="start"
    sx={{ ml: 0, justifyContent: 'flex-end' }}
  />
));

export default FormSwitch;
