import { IconType } from 'react-icons'

import { FaPlaystation } from 'react-icons/fa'
import { HiOutlineDevicePhoneMobile } from 'react-icons/hi2'
import { IoWatchOutline } from 'react-icons/io5'
import { MdLaptopMac, MdOutlineMoreHoriz, MdPhoneIphone } from 'react-icons/md'
import { SiNintendoswitch } from 'react-icons/si'
import { TbDeviceAirpods, TbDeviceIpad } from 'react-icons/tb'

type CategoriesIconType = Record<string, IconType>

export const CATEGORIES_ICON: CategoriesIconType = {
  HiOutlineDevicePhoneMobile: HiOutlineDevicePhoneMobile,
  MdLaptopMac: MdLaptopMac,
  TbDeviceAirpods: TbDeviceAirpods,
  IoWatchOutline: IoWatchOutline,
  TbDeviceIpad: TbDeviceIpad,
  FaPlaystation: FaPlaystation,
  SiNintendoswitch: SiNintendoswitch,
  MdPhoneIphone: MdPhoneIphone,
  MdOutlineMoreHoriz: MdOutlineMoreHoriz,
} as const

export const URL_BANNERS_PAGE = {
  ORDER:
    'https://media.discordapp.net/attachments/527833557268168705/1210269041931849758/f9f3349bbbd0303d.png?ex=65e9f1e1&is=65d77ce1&hm=2baba87cf472372c21f6dbee16a58a9d82e8863a4416a3ea0febcf51287f8352&=&format=webp&quality=lossless&width=1122&height=702',
  GENERAL:
    'https://media.discordapp.net/attachments/740240537365250111/1209825421743620106/set_up.png?ex=65e854ba&is=65d5dfba&hm=d63546e68191b4f78ba12c072cb41d70e7c0724357e272d92dd81cb449cb73ce&=&format=webp&quality=lossless&width=1122&height=702',
  PROMO:
    'https://media.discordapp.net/attachments/527833557268168705/1211382071285649528/b4654f46a7c9be88.png?ex=65edfe78&is=65db8978&hm=ad00fc869c1994ee96f88df6b118f7931b7eb29ac2fb5134181a22d3b18b31ff&=&format=webp&quality=lossless&width=550&height=344',
}

export const PROMO_CODES_CONTROLLED_DATA = [
  { value: 'all', label: 'Все' },
  { value: 'used', label: 'Использованные' },
  { value: 'available', label: 'Доступные' },
]
