import { ReactNode, useState } from 'react';
import { Box, IconButton, Modal as MModal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

type Props = {
  children?: ReactNode;
  onClose: () => void;
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '10px',
  boxShadow: 24,
  px: 4,
  py: 6,
};

const Modal = ({ children, onClose }: Props) => {
  const [isShow, setIsShow] = useState(true);

  const closeModalHandler = () => {
    onClose();
    setIsShow(false);
  };

  return (
    <MModal
      open={isShow}
      onClose={closeModalHandler}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <IconButton
          onClick={closeModalHandler}
          aria-label="close"
          size="small"
          sx={{ position: 'absolute', right: 10, top: 10 }}
        >
          <CloseIcon />
        </IconButton>
        {children}
      </Box>
    </MModal>
  );
};

export default Modal;
