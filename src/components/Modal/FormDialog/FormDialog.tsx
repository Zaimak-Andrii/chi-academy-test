import { Box, Button, TextField } from '@mui/material';
import { ICar } from '@/types/ICar';

type Props = {
  type: 'edit' | 'create';
  item?: ICar;
  onSuccess?: () => void;
  onClose: () => void;
};

const FormDialog = ({ type, item, onClose }: Props) => {
  const submitHandler = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
  };

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      display="flex"
      flexDirection="column"
      gap={2}
      onSubmit={submitHandler}
    >
      <TextField
        label="Company"
        variant="outlined"
        defaultValue={item?.company}
        fullWidth
        size="small"
        disabled={type === 'edit'}
      />
      <TextField
        label="Model"
        variant="outlined"
        defaultValue={item?.model}
        fullWidth
        size="small"
        disabled={type === 'edit'}
      />
      <TextField
        label="VIN-code"
        variant="outlined"
        defaultValue={item?.vin}
        fullWidth
        size="small"
        disabled={type === 'edit'}
      />
      <TextField
        label="Year"
        variant="outlined"
        defaultValue={item?.year}
        fullWidth
        size="small"
        disabled={type === 'edit'}
      />

      <TextField
        label="Color"
        variant="outlined"
        defaultValue={item?.color}
        fullWidth
        size="small"
      />
      <TextField
        label="Price"
        variant="outlined"
        defaultValue={item?.price}
        fullWidth
        size="small"
      />
      <TextField
        label="Availability"
        variant="outlined"
        defaultValue={item?.availability}
        fullWidth
        size="small"
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
