import { Box, Button, Typography } from '@mui/material';

type Props = {
  id: number;
  onClose: () => void;
};

const DeleteDialog = ({ id, onClose }: Props) => {
  return (
    <>
      <Typography component="p" variant="subtitle1" textAlign="center">
        Are you sure you want to delete this car?
      </Typography>
      <Box mx="auto" mt={3} display="flex" justifyContent="center" gap={4}>
        <Button variant="contained" color="success">
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
