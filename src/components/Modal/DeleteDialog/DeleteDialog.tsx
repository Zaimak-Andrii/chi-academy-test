import { Box, Button, Typography } from '@mui/material';
import { useAppDispatch } from '@/hooks';
import { deleteCar } from '@/redux/cars/cars.slice';

type Props = {
  id: number;
  onClose: () => void;
};

const DeleteDialog = ({ id, onClose }: Props) => {
  const dispatch = useAppDispatch();

  const deleteCarHandler = () => {
    dispatch(deleteCar(id));
  };
  return (
    <>
      <Typography component="p" variant="subtitle1" textAlign="center">
        Are you sure you want to delete this car?
      </Typography>
      <Box mx="auto" mt={3} display="flex" justifyContent="center" gap={4}>
        <Button variant="contained" color="success" onClick={deleteCarHandler}>
          Yes
        </Button>
        <Button variant="contained" color="primary" onClick={onClose}>
          Close
        </Button>
      </Box>
    </>
  );
};

export default DeleteDialog;
