import Filter from '@/components/Filter';
import React from 'react';

export default function CollectionLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto grid grid-cols-12 gap-5">
      <div className="col-span-3">
        <Filter />
      </div>
      <div className="col-span-9">{children}</div>
    </div>
  );
}
