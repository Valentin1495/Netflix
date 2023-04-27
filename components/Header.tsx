import Link from 'next/link';
import { useRouter } from 'next/router';
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

  const router = useRouter();

  return (
    <header
      className={`z-20 fixed top-0 left-0 right-0 pl-3 transition-colors duration-300 ${
        scrolled && 'bg-black'
      } `}
    >
      <img
        onClick={() => router.push('/')}
        src='https://rb.gy/ulxxee'
        alt='Netflix Logo'
        className='w-32 h-16 cursor-pointer'
      />
    </header>
  );
}
