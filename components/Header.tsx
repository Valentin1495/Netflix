import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Header() {
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`z-20 fixed top-0 w-full p-3 flex items-center space-x-5 transition-colors duration-300 ${
        scrolled && 'bg-black'
      } `}
    >
      <Link href={'/'}>
        <Image
          src='https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg'
          alt='Netflix Logo'
          className='cursor-pointer'
          width={128}
          height={64}
        />
      </Link>

      <Link
        href={'/myList'}
        className='text-white text-lg font-bold cursor-pointer'
      >
        My List
      </Link>
    </header>
  );
}
