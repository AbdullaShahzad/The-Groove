export type Category = 
  | 'ALL VOLUMES'
  | 'FICTION'
  | 'THRILLER'
  | 'MENTAL HEALTH'
  | 'MONEY & MIND'
  | 'CLASSICS'
  | 'PHILOSOPHY';

export interface Volume {
  id: string;
  volNum: number;
  volString: string; // e.g. "VOL. 01"
  title: string;
  author: string;
  price: number; // in USD ($)
  category: Category;
  spineColor: string;
  accentColor: string;
  foilColor: string;
  publishedYear: number;
  isbn: string;
  stockCount: number;
  synopsis: string;
  bindingSpecs: {
    clothDescription: string;
    format: string;
    paperStock: string;
  };
  pointCost?: number;
  currencyPrice?: string; // e.g. "$49.00"
  itemType?: 'book' | 'wand' | 'bookmark';
  woodType?: string;
  coreType?: string;
  lengthInches?: number;
  physicalDimensions?: {
    widthPx: number; // width of spine in pixels
    heightPx: number; // height of spine in pixels
    pageCount: number;
  };
  samplePages?: {
    page1: {
      header: string;
      subHeader: string;
      bodyText: string;
      epigraph?: string;
    };
    page2: {
      chapterTitle: string;
      dropCap: string;
      bodyParagraphs: string[];
    };
  };
}

export interface WandProduct {
  id: string;
  name: string;
  wielder?: string;
  signature?: string;
  edition: string; // e.g. "GRYFFINDOR EDITION"
  wood: string;
  core: string;
  length: string;
  flexibility: string;
  drawerNumber: string; // e.g. "DRAWER NO. 04"
  specimenRarity: string;
  categoryGroup?: 'students' | 'masters' | 'dark-arts';
  pointCost: number;
  moneyPriceUsd: number; // in USD ($)
  description: string;
  lore: string;
  accentColor: string;
  silhouetteType: 
    | 'dumbledore'
    | 'harry'
    | 'hermione'
    | 'ron'
    | 'neville'
    | 'ginny'
    | 'mcgonagall'
    | 'luna'
    | 'voldemort'
    | 'snape'
    | 'bellatrix';
}

export interface CartItem {
  volume: Volume;
  quantity: number;
}

export interface OrderRecord {
  id: string; // e.g. "GRV-410531"
  date: string;
  status: 'CONFIRMED' | 'DISPATCHED' | 'DELIVERED';
  recipientName: string;
  recipientEmail: string;
  streetAddress: string;
  city: string;
  postalCode: string;
  items: {
    volString: string;
    title: string;
    author: string;
    price: number;
    quantity: number;
  }[];
  total: number;
}

// User Experience Mode Roles: PATRON, TRAILER, CURATOR ADMIN
export type UserRole = 'patron' | 'trailer' | 'curator-admin' | 'admin' | 'user';

export type HogwartsHouse = 'gryffindor' | 'slytherin' | 'ravenclaw' | 'hufflepuff';

export interface HouseInfo {
  id: HogwartsHouse;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    goldOrSilver: string;
    text: string;
  };
  founder: string;
  element: string;
  animal: string;
  traits: string[];
  motto: string;
  ghost: string;
  commonRoom: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  house?: HogwartsHouse;
  housePoints?: number;
  title?: string;
  memberSince?: string;
}
