import Link from 'next/link';

export default function Nav() {
  return (
    <nav className='bg-black fixed top-0 left-0 right-0'>
      <Link href='/'>
        <img
          src='//cnbl-cdn.bamgrid.com/assets/7ecc8bcb60ad77193058d63e321bd21cbac2fc67281dbd9927676ea4a4c83594/original'
          className='w-20 h-20'
          alt='Disney+ Logo'
        />
      </Link>
    </nav>
  );
}
