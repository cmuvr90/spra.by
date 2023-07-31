import Link from 'next/link';

export default function Menu({ menu = [] }: { menu: Menu[] }) {
  const renderItems = (items: Menu[], deep: number = 1) => {
    return items.length ? (
      <ul>
        {items.map((i, index) => {
          return (
            <li key={`${deep}_${index}`}>
              {i.url?.length ? <Link href={i.url}>{i.title}</Link> : <span>{i.title}</span>}

              {i?.children?.length && renderItems(i.children, deep + 1)}
            </li>
          );
        })}
      </ul>
    ) : null;
  };

  return <nav className="sp-menu">{renderItems(menu)}</nav>;
}

type Menu = {
  title: string;
  url?: string;
  children?: Menu[];
};
