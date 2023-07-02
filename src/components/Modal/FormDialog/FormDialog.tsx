import { Box, Button } from '@mui/material';
import { ICar } from '@/types/ICar';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import FormInput from './FormInput';
import FormSwitch from './FormSwitch/FormSwitch';

type FormValuesType = Omit<ICar, 'id'>;
type Props = {
  type: 'edit' | 'create';
  item?: FormValuesType;
  onSuccess?: (car: FormValuesType) => void;
  onClose: () => void;
};

const initialValues: FormValuesType = {
  company: '',
  model: '',
  vin: '',
  color: '',
  price: '',
  year: new Date().getFullYear(),
  availability: true,
};

const FormDialog = ({ type, item, onClose, onSuccess }: Props) => {
  const { control, handleSubmit } = useForm<FormValuesType>({
    defaultValues: item || initialValues,
  });

  const isEdit = type === 'edit';

  const submitHandler: SubmitHandler<FormValuesType> = data => {
    console.log(data);
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
      <Controller
        name="company"
        control={control}
        render={({ field }) => <FormInput label="Company" disabled={isEdit} {...field} />}
      />

      <Controller
        name="model"
        control={control}
        render={({ field }) => <FormInput label="Model" disabled={isEdit} {...field} />}
      />

      <Controller
        name="vin"
        control={control}
        render={({ field }) => <FormInput label="VIN-code" disabled={isEdit} {...field} />}
      />

      <Controller
        name="year"
        control={control}
        render={({ field }) => (
          <FormInput type="number" label="Year" disabled={isEdit} {...field} />
        )}
      />

      <Controller
        name="color"
        control={control}
        render={({ field }) => <FormInput label="Color" {...field} />}
      />

      <Controller
        name="price"
        control={control}
        render={({ field }) => <FormInput label="Price" {...field} />}
      />

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
