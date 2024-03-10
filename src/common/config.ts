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
  ORDER: 'https://i.ibb.co/5FhYfFD/tracked-model.png',
  GENERAL: 'https://i.ibb.co/PwPCpYJ/set-up.png',
  PROMO: 'https://i.ibb.co/7W0jSMR/promocode.png',
}

export const PROMO_CODES_CONTROLLED_DATA = [
  { value: 'all', label: 'Все' },
  { value: 'used', label: 'Использованные' },
  { value: 'available', label: 'Доступные' },
]

export const PRICE_STEP_SLIDER_MARKS = [
  { value: 0, label: '200' },
  { value: 25, label: '500' },
  { value: 50, label: '1000' },
  { value: 75, label: '2000' },
  { value: 100, label: '5000' },
]
