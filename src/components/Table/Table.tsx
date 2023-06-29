import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableFooter,
  TablePagination,
  FormControl,
  Select,
  MenuItem,
} from '@mui/material';
import { ICar } from '@/types/ICar';
import { useState } from 'react';
import TablePaginationActions from './TablePaginationActions';

type Props = {
  cars: ICar[];
};

const AppTable = ({ cars }: Props) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - cars.length) : 0;

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      <Table stickyHeader sx={{ minWidth: 650 }} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Company</TableCell>
            <TableCell align="center">Model</TableCell>
            <TableCell align="center">VIN</TableCell>
            <TableCell align="center">Color</TableCell>
            <TableCell align="center">Year</TableCell>
            <TableCell align="center">Price</TableCell>
            <TableCell align="center">Availability</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cars.length === 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={8} sx={{ textAlign: 'center' }}>
                Cars not found
              </TableCell>
            </TableRow>
          )}
          {(rowsPerPage > 0
            ? cars.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : cars
          ).map(car => (
            <TableRow key={car.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell align="left">{car.company}</TableCell>
              <TableCell align="center">{car.model}</TableCell>
              <TableCell align="center">{car.vin}</TableCell>
              <TableCell align="center">{car.color}</TableCell>
              <TableCell align="center">{car.year}</TableCell>
              <TableCell align="center">{car.price}</TableCell>
              <TableCell align="center">{car.availability ? 'yes' : 'no'}</TableCell>
              <TableCell align="center" style={{ width: '10px' }}>
                <FormControl sx={{ minWidth: 120, fontSize: '10px' }} size="small">
                  <Select
                    value="none"
                    onChange={evt => {
                      console.log(evt.target.value);
                    }}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                    <MenuItem value="none" disabled>
                      Choose action
                    </MenuItem>
                    <MenuItem value="edit">Edit</MenuItem>
                    <MenuItem value="delete">Delete</MenuItem>
                  </Select>
                </FormControl>
              </TableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={8} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={8}
              count={cars.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default AppTable;
