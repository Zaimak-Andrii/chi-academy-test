import { useEffect, useState } from 'react';
import { Container } from '@mui/material';
import { selectCars } from '@/redux/cars/cars.selectors';
import { fetchCarsThunk } from '@/redux/cars/cars.thunk';
import { useAppDispatch, useAppSelector } from '@/hooks';
import type { ICar } from '@/types/cars.types';
import AppTable from '@/components/Table';
import Search from '@/components/Search';
import AddCarButton from '@/components/AddCardButton';

function filterIt(arr: ICar[], searchKey: string) {
  return arr.filter(({ id: _, ...carOther }) => {
    return Object.values(carOther).some(value => {
      const str = typeof value === 'boolean' ? (value ? 'yes' : 'no') : value;

      return str.toString().toLowerCase().includes(searchKey.toLocaleLowerCase());
    });
  });
}

function App() {
  const cars = useAppSelector(selectCars);
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(fetchCarsThunk());
  }, [dispatch]);

  return (
    <Container sx={{ position: 'relative', py: 2 }}>
      <Search onChange={setSearch} />
      <AppTable cars={filterIt(cars, search)} />
      <AddCarButton />
    </Container>
  );
}

export default App;
