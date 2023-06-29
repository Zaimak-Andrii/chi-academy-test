import {
  Paper,
  TableContainer,
  Table,
  TableRow as MTableRow,
  TableCell,
  TableBody,
  TableFooter,
} from '@mui/material';
import { ICar } from '@/types/ICar';
import { useState } from 'react';
import TableRow from './TableRow';
import TablePagination from './TablePagination';
import TableHead from './TableHead';

type Props = {
  cars: ICar[];
};

const headers = [
  'Company',
  'Model',
  'VIN-Code',
  'Color',
  'Year',
  'Price',
  'Availability',
  "Action's",
];

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
        <TableHead headers={headers} />
        <TableBody>
          {cars.length === 0 ? (
            <MTableRow>
              <TableCell colSpan={headers.length} sx={{ textAlign: 'center' }}>
                Cars not found
              </TableCell>
            </MTableRow>
          ) : (
            (rowsPerPage > 0
              ? cars.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : cars
            ).map(car => <TableRow key={car.id} value={car} />)
          )}
        </TableBody>
        {cars.length > 0 && cars.length > rowsPerPage && (
          <TableFooter>
            <TablePagination
              colSpan={headers.length}
              count={cars.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableFooter>
        )}
      </Table>
    </TableContainer>
  );
};

export default AppTable;
