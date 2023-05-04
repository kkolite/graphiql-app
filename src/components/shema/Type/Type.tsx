import { IQuery } from '../../../data/types';

interface IProps {
  obj: IQuery;
  query: string;
}

export const Type = ({ obj, query }: IProps) => {
  return (
    <div>
      <h4>{query}</h4>
      <p>{obj[query].name}</p>
      <p>{obj[query].description}</p>
      <div>
        <label>Args</label>
        {obj[query].args.map((el, i) => (
          <p key={i}>
            {el.name} ({el.type})
          </p>
        ))}
      </div>
      <br /> {/* temp!!!!!! */}
    </div>
  );
};
