import Link from 'next/link';

export default function Header() {
  return (
    <header className='z-10 fixed top-0 left-0 right-0 pl-3'>
      <Link href='/'>
        <img
          src='https://rb.gy/ulxxee'
          alt='Netflix Logo'
          className='w-32 h-16 lg:w-40 lg:h-20'
        />
      </Link>
    </header>
  );
}
