'use client';

import Link from 'next/link';

export default function Header(): JSX.Element {
  return (
    <header style={{ backgroundColor: 'red', padding: '8px 25px' }}>
      <Link href={'/'}>OMDB</Link>
      <nav>
        {/* Implement search here */}
        <input type="text" />
      </nav>
    </header>
  );
}
