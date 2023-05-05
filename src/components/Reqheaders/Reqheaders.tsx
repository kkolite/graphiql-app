import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setreqHeaders } from '../store/slice/reqheadersSlice';

export const RHeaders = () => {
  const dispatch = useAppDispatch();
  const { itemsVal } = useAppSelector((state) => state.reqHeaders);
  return (
    <table>
      <th>
        <td>KEY</td>
        <td>VALUE</td>
        <td></td>
      </th>
      <tbody>
        {itemsVal.map((item) => {
          return (
            <tr>
              <td>{item.key}</td>
              <td>{item.value}</td>
              <td></td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
