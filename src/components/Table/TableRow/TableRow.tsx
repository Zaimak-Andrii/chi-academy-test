import { TableRow as MaterialTableRow, TableCell, TableRowProps } from '@mui/material';
import { ICar } from '@/types/ICar';
import { EAvailability } from '@/types/AvailabilityEnum';

interface Props extends TableRowProps {
  value: ICar;
}

const TableRow = ({ value, ...otherProps }: Props) => {
  const { company, model, vin, color, year, price, availability } = value;
  return (
    <MaterialTableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} {...otherProps}>
      <TableCell align="left">{company}</TableCell>
      <TableCell align="center">{model}</TableCell>
      <TableCell align="center">{vin}</TableCell>
      <TableCell align="center">{color}</TableCell>
      <TableCell align="center">{year}</TableCell>
      <TableCell align="center">{price}</TableCell>
      <TableCell align="center">{availability ? EAvailability.YES : EAvailability.NO}</TableCell>
      <TableCell align="center">
        {/* <FormControl sx={{ minWidth: 120, fontSize: '10px' }} size="small">
          <Select
            value="none"
            onChange={evt => {
              console.log(evt.target.value, document.querySelector('#modal'));
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
        </FormControl> */}
      </TableCell>
    </MaterialTableRow>
  );
};

export default TableRow;
