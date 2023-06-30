import { TableRow as MaterialTableRow, TableCell, TableRowProps } from '@mui/material';
import { ICar } from '@/types/ICar';
import { EAvailability } from '@/types/AvailabilityEnum';
import ActionSelect from '../ActionSelect';

interface Props extends TableRowProps {
  value: ICar;
}

const TableRow = ({ value, ...otherProps }: Props) => {
  const { company, model, vin, color, year, price, availability } = value;
  return (
    <MaterialTableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} {...otherProps}>
      <TableCell align="left">{company}</TableCell>
      <TableCell align="left">{model}</TableCell>
      <TableCell align="left">{vin}</TableCell>
      <TableCell align="left">{color}</TableCell>
      <TableCell align="left">{year}</TableCell>
      <TableCell align="left">{price}</TableCell>
      <TableCell align="left">{availability ? EAvailability.YES : EAvailability.NO}</TableCell>
      <TableCell align="left" sx={{ padding: '0 10px' }}>
        <ActionSelect item={value} />
      </TableCell>
    </MaterialTableRow>
  );
};

export default TableRow;
