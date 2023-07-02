import { Divider, InputBase, MenuItem, Paper, Select, SelectChangeEvent } from '@mui/material';
import { useEffect, useState } from 'react';
import { ICar } from '@/types/cars.types';
import { useDebounce } from 'usehooks-ts';

type Props = {
  onChange: (value: string, field: SearchType) => void;
};

export type SearchType = keyof Omit<ICar, 'id'> | 'all';

const Search = ({ onChange }: Props) => {
  const [value, setValue] = useState('');
  const debouncedValue = useDebounce(value, 300);
  const [searchField, setSearchField] = useState<SearchType>('all');

  const changeInputHandler = (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(evt.target.value);
  };

  const changeSelectHandler = (evt: SelectChangeEvent<SearchType>) => {
    const field = evt.target.value as SearchType;
    setSearchField(field);
  };

  useEffect(() => {
    onChange(debouncedValue, searchField);
  }, [debouncedValue, onChange, searchField]);

  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 600, mx: 'auto', mb: 3 }}
    >
      <InputBase
        name="searchValue"
        sx={{ ml: 1, flex: 1 }}
        value={value}
        onChange={changeInputHandler}
        placeholder="Search "
        inputProps={{ 'aria-label': 'search' }}
      />
      <Divider sx={{ height: 28, mx: 0.5 }} orientation="vertical" />
      <Select
        name="searchField"
        value={searchField}
        onChange={changeSelectHandler}
        sx={{ width: 130 }}
      >
        <MenuItem value="all">All</MenuItem>
        <MenuItem value="company">Company</MenuItem>
        <MenuItem value="model">Model</MenuItem>
        <MenuItem value="vin">VIN-code</MenuItem>
        <MenuItem value="color">Color</MenuItem>
        <MenuItem value="year">Year</MenuItem>
        <MenuItem value="price">Price</MenuItem>
        <MenuItem value="availability">Availability</MenuItem>
      </Select>
    </Paper>
  );
};

export default Search;
