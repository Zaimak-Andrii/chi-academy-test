import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useEffect, useState } from 'react';
import { getCarsService } from './services/api';
import { ICar } from './types/ICar';

function App() {
  const [cars, setCars] = useState<ICar[]>([]);

  useEffect(() => {
    const run = async () => {
      const data = await getCarsService();

      setCars(data);
    };

    run();
  }, []);

  return (
    <Container>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell align='center'>Id</TableCell>
              <TableCell align='left'>Company</TableCell>
              <TableCell align='right'>Model</TableCell>
              <TableCell align='right'>VIN</TableCell>
              <TableCell align='right'>Color</TableCell>
              <TableCell align='right'>Year</TableCell>
              <TableCell align='right'>Price</TableCell>
              <TableCell align='right'>Availability</TableCell>
              <TableCell align='right'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cars.map((car) => (
              <TableRow key={car.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align='center'>{car.id}</TableCell>
                <TableCell align='left'>{car.company}</TableCell>
                <TableCell align='right'>{car.model}</TableCell>
                <TableCell align='right'>{car.vin}</TableCell>
                <TableCell align='right'>{car.color}</TableCell>
                <TableCell align='right'>{car.year}</TableCell>
                <TableCell align='right'>{car.price}</TableCell>
                <TableCell align='right'>{car.availability ? 'yes' : 'no'}</TableCell>
                <TableCell align='right'>Action</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default App;
