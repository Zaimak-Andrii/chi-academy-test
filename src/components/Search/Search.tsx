import {
  Divider,
  IconButton,
  InputBase,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { ICar } from '@/types/cars.types';

type Props = {
  onChange: (value: string, field: SearchType) => void;
};

export type SearchType = keyof Omit<ICar, 'id'> | 'all';

const Search = ({ onChange }: Props) => {
  const [value, setValue] = useState('');
  const [searchField, setSearchField] = useState<SearchType>('all');

  const changeInputHandler = (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(evt.target.value);
  };

  const changeSelectHandler = (evt: SelectChangeEvent<SearchType>) => {
    const field = evt.target.value as SearchType;
    setSearchField(field);

    onChange(value, field);
  };

  const submitHandler = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    onChange(value, searchField);
  };

  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 600, mx: 'auto', mb: 3 }}
      onSubmit={submitHandler}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        value={value}
        onChange={changeInputHandler}
        placeholder="Search "
        inputProps={{ 'aria-label': 'search' }}
      />
      <Divider sx={{ height: 28, mx: 0.5 }} orientation="vertical" />
      <Select value={searchField} onChange={changeSelectHandler} sx={{ width: 130 }}>
        <MenuItem value="all">All</MenuItem>
        <MenuItem value="company">Company</MenuItem>
        <MenuItem value="model">Model</MenuItem>
        <MenuItem value="vin">VIN-code</MenuItem>
        <MenuItem value="color">Color</MenuItem>
        <MenuItem value="year">Year</MenuItem>
        <MenuItem value="price">Price</MenuItem>
        <MenuItem value="availability">Availability</MenuItem>
      </Select>
      <Divider sx={{ height: 28, mx: 0.5 }} orientation="vertical" />
      <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default Search;
