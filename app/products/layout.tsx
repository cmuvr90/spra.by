import React from 'react';

export default function CollectionLayout({ children }: { children: React.ReactNode }) {
  return <div className="container mx-auto">{children}</div>;
}
