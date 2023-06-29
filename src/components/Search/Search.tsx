import { IconButton, InputBase, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';

type Props = {
  onChange: (value: string) => void;
};

const Search = ({ onChange }: Props) => {
  const [value, setValue] = useState('');

  const changeInputHandler = (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(evt.target.value);
  };

  const submitHandler = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    onChange(value.trim());
  };

  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 500, mx: 'auto', mb: 3 }}
      onSubmit={submitHandler}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        value={value}
        onChange={changeInputHandler}
        placeholder="Search "
        inputProps={{ 'aria-label': 'search' }}
      />
      <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default Search;
