import Checkbox from './Checkbox';

const Filter = ({ filter = filterDefault }: Props) => {
  return (
    <div className="flex gap-5 flex-col">
      <h3 className="text-gray-800 font-bold text-sm">{filter.title}</h3>
      <ul className="flex flex-col gap-2">
        {filter.values.map((i, index) => {
          return (
            <li key={index}>
              <Checkbox label={i.label} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

type Props = {
  filter?: {
    title: string;
    values: {
      label: string;
      value: string;
    }[];
  };
};

const filterDefault = {
  title: 'Размер',
  values: [
    {
      label: 'S',
      value: 's',
    },
    {
      label: 'M',
      value: 'm',
    },
    {
      label: 'L',
      value: 'l',
    },
    {
      label: 'XL',
      value: 'xl',
    },
  ],
};

export default Filter;
