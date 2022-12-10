import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import Button from './button';

import images from '../assets';

import { NFTContext } from '../context/NFTContext';

const ButtonGroup = ({ setActive, router, setIsOpen }) => {
  const { connectWallet, currentAccount } = useContext(NFTContext);

  return currentAccount ? (
    <Button
      btnName="Create"
      classStyles="mx-2 rounded-xl"
      handleClick={() => {
        setActive('');
        router.push('/create-nft');
        setIsOpen(false);
      }}
    />
  ) : (
    <Button
      btnName="Connect"
      classStyles="mx-2 rounded-xl"
      handleClick={connectWallet}
    />
  );
};

const MenuItems = ({ isMobile, active, setActive, setIsOpen }) => {
  const generateLink = (i) => {
    switch (i) {
      case 0:
        return '/';
      case 1:
        return '/listedNft';
      case 2:
        return '/my-nfts';
      default:
        return '/';
    }
  };
  return (
    <ul
      className={`list-none flexCenter flex-row ${
        isMobile && 'flex-col h-full'
      }`}
    >
      {['Explore NFTs', 'Listed NFTs', 'My NFTs'].map((item, i) => (
        <li
          key={i}
          onClick={() => {
            setActive(item);
            if (isMobile) setIsOpen(false);
          }}
          className={`flex flex-row items-center font-Poppins font-semibold text-base dark:hover:text-white hover:text-nft-dark mx-3 
          ${
            active === item
              ? 'dark:text-white text-nft-black-1'
              : 'dark:text-nft-gray-3 text-nft-gray-2'
          }`}
        >
          <Link href={generateLink(i)}>{item}</Link>
        </li>
      ))}
    </ul>
  );
};

const checkActive = (active, setActive, router) => {
  switch (router.pathname) {
    case '/':
      if (active !== 'Explore NFTs') setActive('Explore NFTs');
      break;

    case '/listedNft':
      if (active !== 'Listed NFTs') setActive('Listed NFTs');
      break;

    case '/my-nfts':
      if (active !== 'My NFTs') setActive('My NFTs');
      break;

    case '/create-nft':
      setActive(' ');
      break;

    default:
      setActive('');
      break;
  }
};
const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const [active, setActive] = useState('Explore NFTs');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    checkActive(active, setActive, router);
  }, [router.pathname]);

  useEffect(() => {
    setTheme('dark');
  }, []);

  return (
    <nav className="flexBetween w-full fixed z-10 p-4 flex-row border-b dark:bg-nft-dark bg-white dark:border-nft-black-1 border-nft-gray-1">
      <div className="flex flex-1 flex-row justify-start">
        <Link href="/">
          <div
            className="flexCenter md:hidden cursor-pointer"
            onClick={() => {
              setActive('Exlpore NFTs');
              setIsOpen(false);
            }}
          >
            <Image
              src={images.logo02}
              objectFit="contain"
              width={32}
              height={32}
              alt="logo"
            />
            <p className="dark:text-white text-nft-black-1 font-Poppins font-semibold text-lg ml-1">
              CryptoKet
            </p>
          </div>
        </Link>

        <Link href="/">
          <div
            className="hidden md:flex"
            onClick={() => {
              setActive('Exlpore NFTs');
              setIsOpen(false);
            }}
          >
            <Image
              src={images.logo02}
              objectFit="contain"
              width={32}
              height={32}
              alt="logo"
            />
          </div>
        </Link>
      </div>

      <div className="flex flex-initial flex-row justify-end">
        <div className="flex items-center">
          <input
            type="checkbox"
            className="checkbox"
            id="checkbox"
            onChange={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          />
          <label
            htmlFor="checkbox"
            className="flexBetween w-8 h-4 bg-black rounded-2xl p-1 relative label"
          >
            <i className="fas fa-sun" />
            <i className="fas fa-moon" />
            <div className="w-3 h-3 absolute bg-white rounded-full ball" />
          </label>
        </div>
        <div className="flex md:hidden">
          <MenuItems active={active} setActive={setActive} />
          <div className="ml-4">
            <ButtonGroup
              setActive={setActive}
              router={router}
              setIsOpen={setIsOpen}
            />
          </div>
        </div>
      </div>

      <div className="hidden md:flex ml-6">
        {isOpen ? (
          <Image
            src={images.cross}
            objectFit="contain"
            height={20}
            width={20}
            alt="close"
            onClick={() => setIsOpen(false)}
            className={theme === 'light' ? 'filter invert' : ''}
          />
        ) : (
          <Image
            src={images.menu}
            objectFit="contain"
            height={25}
            width={25}
            alt="menu"
            onClick={() => setIsOpen(true)}
            className={theme === 'light' ? 'filter invert' : ''}
          />
        )}

        {isOpen && (
          <div className="fixed inset-0 top-65 dark:bg-nft-dark bg-white z-10 nav-h flex justify-between flex-col">
            <div className="flex-1 p-4">
              <MenuItems
                active={active}
                setActive={setActive}
                isMobile
                setIsOpen={setIsOpen}
              />
            </div>

            <div className="p-4 border-t dark:border-nft-black-1 border-nft-gray-1">
              <ButtonGroup
                setActive={setActive}
                router={router}
                setIsOpen={setIsOpen}
              />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
