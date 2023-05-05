import { useAppDispatch, useAppSelector } from '../../store/hooks';
// import { setreqHeaders } from '../store/slice/reqheadersSlice';

export const RHeaders = () => {
  // const dispatch = useAppDispatch();
  const { itemsVal } = useAppSelector((state) => state.reqHeaders);

  return (
    <table>
      <thead>
        <tr>
          <th>KEY</th>
          <th>VALUE</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {itemsVal.map((item) => {
          return (
            <tr key={item.key}>
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
