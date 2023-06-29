import { Container } from '@mui/material';
import { useEffect, useState } from 'react';
import { getCarsService } from './services/api';
import { ICar } from './types/ICar';
import AppTable from './components/Table';
import Search from './components/Search';

function filterIt(arr: ICar[], searchKey: string) {
  return arr.filter(({ id: _, ...carOther }) => {
    return Object.values(carOther).some(value => {
      const str = typeof value === 'boolean' ? (value ? 'yes' : 'no') : value;

      return str.toString().toLowerCase().includes(searchKey.toLocaleLowerCase());
    });
  });
}

function App() {
  const [cars, setCars] = useState<ICar[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const run = async () => {
      const data = await getCarsService();

      setCars(data);
    };

    run();
  }, []);

  return (
    <Container sx={{ py: 2 }}>
      <Search onChange={setSearch} />
      <AppTable cars={filterIt(cars, search)} />
    </Container>
  );
}

export default App;
