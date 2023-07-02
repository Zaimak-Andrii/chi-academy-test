import { Box, Button, InputAdornment } from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormInput from './FormInput';
import FormSwitch from './FormSwitch/FormSwitch';
import type { ICar, ICarForm } from '@/types/cars.types';
import { schema } from './FormDialog.schema';
import { initialValues } from './FormDialog.initial';
import { inputs } from './FormDialog.inputs';

type Props = {
  type: 'edit' | 'create';
  item?: ICar;
  onSuccess?: (car: ICar) => void;
  onClose: () => void;
};

const FormDialog = ({ type, item, onClose, onSuccess }: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ICarForm>({
    defaultValues: item ? { ...item, price: +item.price.replace(/[$]/g, '') } : initialValues,
    resolver: yupResolver(schema),
  });

  const submitHandler: SubmitHandler<ICarForm> = data => {
    if (onSuccess) onSuccess({ ...data, price: `$${data.price.toString()}` } as ICar);

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
      {inputs.map(({ name, label, type, canDisabled, startAdornment }) => {
        return (
          <Controller
            key={name}
            name={name}
            control={control}
            render={({ field }) => (
              <FormInput
                label={label}
                type={type}
                disabled={canDisabled && type === 'edit'}
                InputProps={{
                  startAdornment: startAdornment && (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
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
