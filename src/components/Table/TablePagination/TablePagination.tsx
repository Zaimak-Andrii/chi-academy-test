import { TableRow, TablePagination as MTablePagination, TablePaginationProps } from '@mui/material';
import TablePaginationActions from './TablePaginationActions';

const TablePagination = (props: TablePaginationProps) => {
  return (
    <TableRow>
      <MTablePagination
        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
        SelectProps={{
          inputProps: {
            'aria-label': 'rows per page',
          },
          native: true,
        }}
        ActionsComponent={TablePaginationActions}
        {...props}
      />
    </TableRow>
  );
};

export default TablePagination;
