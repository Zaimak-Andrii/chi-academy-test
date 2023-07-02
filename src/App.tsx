import { useEffect, useState } from 'react';
import { Container } from '@mui/material';
import { selectCars } from '@/redux/cars/cars.selectors';
import { fetchCarsThunk } from '@/redux/cars/cars.thunk';
import { useAppDispatch, useAppSelector } from '@/hooks';
import type { ICar } from '@/types/cars.types';
import AppTable from '@/components/Table';
import Search from '@/components/Search';
import AddCarButton from '@/components/AddCardButton';
import { SearchType } from './components/Search/Search';

function filterIt(arr: ICar[], searchValue: string, searchField: SearchType) {
  if (searchValue.length === 0) return arr;

  if (searchField !== 'all') {
    return arr.filter(car => {
      const str =
        typeof car[searchField] === 'boolean'
          ? car[searchField]
            ? 'yes'
            : 'no'
          : car[searchField];
      return str.toString().toLocaleLowerCase().includes(searchValue.toLocaleLowerCase());
    });
  }

  return arr.filter(({ id: _, ...carOther }) => {
    return Object.values(carOther).some(value => {
      const str = typeof value === 'boolean' ? (value ? 'yes' : 'no') : value;

      return str.toString().toLowerCase().includes(searchValue.toLocaleLowerCase());
    });
  });
}

function App() {
  const cars = useAppSelector(selectCars);
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState<{ value: string; field: SearchType }>({
    value: '',
    field: 'all',
  });

  const changeSearch = (value: string, field: SearchType) => {
    setSearch({ value, field });
  };

  useEffect(() => {
    dispatch(fetchCarsThunk());
  }, [dispatch]);

  return (
    <Container sx={{ position: 'relative', py: 2 }}>
      <Search onChange={changeSearch} />
      <AppTable cars={filterIt(cars, search.value, search.field)} />
      <AddCarButton />
    </Container>
  );
}

export default App;
