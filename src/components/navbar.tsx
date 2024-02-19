import Link from 'next/link';
import Image from 'next/image';

import { Bebas_Neue } from 'next/font/google';

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin']
})

const Navbar = () => {
  return (
    <div className=' bg-black fixed w-full top-0 overflow-hidden'>
      <div className={`xl:mx-96 mx-4 my-4 flex items-center justify-between ${bebasNeue.className}`}>
        <Link href='/'>
          <Image src={"/logo.png"} alt="logo" height={50} width={174}></Image>
        </Link>
        <div>
          <Link className="sm:text-2xl mr-4 text-white hover:text-[#a81716]" href='/sign-in'>
            Entrar
          </Link>
          <Link className="sm:text-2xl text-white hover:text-[#a81716]" href='/sign-up'>
            Cadastrar
          </Link>
        </div>
      </div>
    </div >
  );
};

export default Navbar;