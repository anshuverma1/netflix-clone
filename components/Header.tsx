import { BellIcon, SearchIcon } from '@heroicons/react/solid';
import Link from 'next/link';

import { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
function Header() {
  const [isScolled, setIsScrolled] = useState(false);
  const {logout} = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <header className={`${isScolled && 'bg-[#141414]'}`}>
      <div className="flex items-center space-x-2 md:space-x-10">
        <img
          src="https://rb.gy/ulxxee"
          width={100}
          height={100}
          className="cursor-pointer object-contain"
        />

        <ul className="hidden space-x-5 md:flex">
          <li className="headerLink font-semibold">Home</li>
          <li className="headerLink font-semibold">TV Shows</li>
          <li className="headerLink font-semibold">Movies</li>
          <li className="headerLink font-semibold">New & Popular</li>
          <li className="headerLink font-semibold">My List</li>
        </ul>
      </div>

      <div className="flex items-center space-x-4 text-sm font-light">
        <SearchIcon className="headerLink hidden h-6 w-6 sm:inline" />
        <p className="headerLink hidden lg:inline font-semibold">Children</p>
        <BellIcon className="headerLink h-6 w-6" />
        {/* <Link href="/account"> */}
          <img
            onClick={logout}
            src="https://rb.gy/g1pwyx"
            alt="Account Logo"
            className="cursor-pointer rounded"
          />
        {/* </Link> */}
      </div>
    </header>
  );
}

export default Header;