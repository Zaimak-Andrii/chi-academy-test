import { TableHead as MTableHead, TableCell, TableRow } from '@mui/material';

type Props = {
  headers: string[];
};

const TableHead = ({ headers = [] }: Props) => {
  return (
    <MTableHead>
      <TableRow>
        {headers.map(header => (
          <TableCell key={header} align="left">
            {header}
          </TableCell>
        ))}
      </TableRow>
    </MTableHead>
  );
};

export default TableHead;
