import { useState } from 'react';
import { MenuItem, Select } from '@mui/material';
import Modal from '@/components/Modal';
import DeleteDialog from '@/components/Modal/DeleteDialog';
import FormDialog from '@/components/Modal/FormDialog';
import { ICar } from '@/types/ICar';

type ActionType = 'none' | 'edit' | 'delete';
type Props = {
  item: ICar;
};

const ActionSelect = ({ item }: Props) => {
  const [action, setAction] = useState<ActionType>('none');

  const modalClose = () => {
    setAction('none');
  };

  return (
    <>
      <Select<ActionType>
        value="none"
        onChange={evt => {
          const value = evt.target.value as ActionType;
          console.log(value);

          setAction(value);
        }}
        displayEmpty
        inputProps={{ 'aria-label': 'Without label' }}
        size="small"
        sx={{ fontSize: 'inherit' }}
      >
        <MenuItem value="none" disabled sx={{ fontSize: '14px' }}>
          Action
        </MenuItem>
        <MenuItem value="edit" sx={{ fontSize: '14px' }}>
          Edit
        </MenuItem>
        <MenuItem value="delete" sx={{ fontSize: '14px' }}>
          Delete
        </MenuItem>
      </Select>
      {action !== 'none' && (
        <Modal onClose={modalClose}>
          {action === 'delete' ? (
            <DeleteDialog id={1} onClose={modalClose} />
          ) : (
            <FormDialog type="edit" item={item} onClose={modalClose} />
          )}
        </Modal>
      )}
    </>
  );
};

export default ActionSelect;
