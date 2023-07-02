import { Box, Button } from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormInput from './FormInput';
import FormSwitch from './FormSwitch/FormSwitch';
import type { ICarForm } from '@/types/cars.types';
import { schema } from './FormDialog.schema';
import { initialValues } from './FormDialog.initial';

type Props = {
  type: 'edit' | 'create';
  item?: ICarForm;
  onSuccess?: (car: ICarForm) => void;
  onClose: () => void;
};

const inputs: {
  name: keyof ICarForm;
  label: string;
  type: HTMLInputElement['type'];
  canDisabled: boolean;
}[] = [
  { name: 'company', label: 'Company', type: 'text', canDisabled: true },
  { name: 'model', label: 'Model', type: 'text', canDisabled: true },
  { name: 'vin', label: 'VIN-code', type: 'text', canDisabled: true },
  { name: 'year', label: 'Year', type: 'number', canDisabled: true },
  { name: 'color', label: 'Color', type: 'text', canDisabled: false },
  { name: 'price', label: 'Price', type: 'text', canDisabled: false },
];

const FormDialog = ({ type, item, onClose, onSuccess }: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ICarForm>({
    defaultValues: item || initialValues,
    resolver: yupResolver(schema),
  });

  const isEdit = type === 'edit';

  const submitHandler: SubmitHandler<ICarForm> = data => {
    if (onSuccess) onSuccess(data);

    onClose();
  };

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      display="flex"
      flexDirection="column"
      gap={2}
      onSubmit={handleSubmit(submitHandler)}
    >
      {inputs.map(({ name, label, type, canDisabled }) => {
        return (
          <Controller
            key={name}
            name={name}
            control={control}
            render={({ field }) => (
              <FormInput
                label={label}
                type={type}
                disabled={canDisabled && isEdit}
                {...field}
                error={!!errors[name]}
                helperText={errors[name]?.message}
              />
            )}
          />
        );
      })}

      <Controller
        name="availability"
        control={control}
        render={({ field }) => <FormSwitch label="Availability" {...field} />}
      />

      <Box mx="auto" mt={1} display="flex" justifyContent="center" gap={4}>
        <Button type="submit" variant="contained" color="success">
          {type === 'edit' ? 'Save changes' : 'Create'}
        </Button>
        <Button variant="contained" color="primary" onClick={onClose}>
          Close
        </Button>
      </Box>
    </Box>
  );
};

export default FormDialog;
