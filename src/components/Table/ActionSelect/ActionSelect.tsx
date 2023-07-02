import { useState } from 'react';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import Modal from '@/components/Modal';
import DeleteDialog from '@/components/Modal/DeleteDialog';
import FormDialog from '@/components/Modal/FormDialog';
import type { ICar } from '@/types/cars.types';
import { useAppDispatch } from '@/hooks';
import { updateCar } from '@/redux/cars/cars.slice';

type ActionType = 'none' | 'edit' | 'delete';
type Props = {
  item: ICar;
};

const ActionSelect = ({ item }: Props) => {
  const dispatch = useAppDispatch();
  const [action, setAction] = useState<ActionType>('none');

  const changeHandler = (evt: SelectChangeEvent<ActionType>) => {
    const value = evt.target.value as ActionType;

    setAction(value);
  };

  const modalClose = () => {
    setAction('none');
  };

  const updateHandler = (car: Omit<ICar, 'id'>) => {
    dispatch(updateCar(car as ICar));
  };

  return (
    <>
      <Select<ActionType>
        name="select"
        value="none"
        onChange={changeHandler}
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
            <DeleteDialog id={item.id} onClose={modalClose} />
          ) : (
            <FormDialog type="edit" item={item} onSuccess={updateHandler} onClose={modalClose} />
          )}
        </Modal>
      )}
    </>
  );
};

export default ActionSelect;
