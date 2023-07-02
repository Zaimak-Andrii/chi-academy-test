import { useState } from 'react';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Modal from '../Modal';
import FormDialog from '../Modal/FormDialog';
import type { ICarForm } from '@/types/cars.types';
import { useAppDispatch } from '@/hooks';
import { addCar } from '@/redux/cars/cars.slice';

const AddCarButton = () => {
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const modalOpen = () => {
    setIsModalOpen(true);
  };

  const modalClose = () => {
    setIsModalOpen(false);
  };

  const successHandler = async (car: ICarForm) => {
    dispatch(addCar(car));
  };

  return (
    <>
      <Fab
        color="primary"
        aria-label="add new car"
        sx={{ position: 'fixed', right: 20, bottom: 20, zIndex: 2 }}
        onClick={modalOpen}
      >
        <AddIcon />
      </Fab>
      {isModalOpen && (
        <Modal onClose={modalClose}>
          <FormDialog type="create" onSuccess={successHandler} onClose={modalClose} />
        </Modal>
      )}
    </>
  );
};

export default AddCarButton;
