import { Button, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import Modal from '../Modal';
import FormDialog from '../Modal/FormDialog';

const AddCarButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const modalOpen = () => {
    setIsModalOpen(true);
  };

  const modalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        color="primary"
        variant="contained"
        size="large"
        startIcon={<AddIcon />}
        sx={{ position: 'fixed', right: 20, bottom: 20, zIndex: 2 }}
        onClick={modalOpen}
      >
        Create
      </Button>
      {isModalOpen && (
        <Modal onClose={modalClose}>
          <FormDialog type="create" onClose={modalClose} />
        </Modal>
      )}
    </>
  );
};

export default AddCarButton;
