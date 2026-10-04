import { HogwartsHouse, HouseInfo } from '../types';

export interface HouseThemeData extends HouseInfo {
  theme: {
    bg: string;
    bgSubtle: string;
    headerBg: string;
    primary: string;
    secondary: string;
    accent: string;
    dark: string;
    text: string;
    textMuted: string;
    border: string;
    cardBg: string;
    glow: string;
  };
}

export const HOGWARTS_HOUSES: Record<HogwartsHouse, HouseThemeData> = {
  gryffindor: {
    id: 'gryffindor',
    name: 'Gryffindor',
    colors: {
      primary: '#7A1018',
      secondary: '#A88A45',
      goldOrSilver: '#A88A45',
      text: '#16120F',
    },
    theme: {
      bg: '#FFFFFF',
      bgSubtle: '#F8F7F4',
      headerBg: 'rgba(255, 255, 255, 0.98)',
      primary: '#7A1018',
      secondary: '#A88A45',
      accent: '#7A1018',
      dark: '#16120F',
      text: '#16120F',
      textMuted: '#6B6359',
      border: '#E8E5DF',
      cardBg: '#FFFFFF',
      glow: 'rgba(168, 138, 69, 0.15)',
    },
    founder: 'Godric Gryffindor',
    element: 'Fire',
    animal: 'Lion',
    traits: ['Courage', 'Chivalry', 'Daring', 'Nerve'],
    motto: 'Their daring, nerve and chivalry set Gryffindors apart',
    ghost: 'Nearly Headless Nick',
    commonRoom: 'Gryffindor Tower',
  },
  slytherin: {
    id: 'slytherin',
    name: 'Slytherin',
    colors: {
      primary: '#124C38',
      secondary: '#A8AAA5',
      goldOrSilver: '#A8AAA5',
      text: '#16120F',
    },
    theme: {
      bg: '#FFFFFF',
      bgSubtle: '#F8F7F4',
      headerBg: 'rgba(255, 255, 255, 0.98)',
      primary: '#124C38',
      secondary: '#A8AAA5',
      accent: '#124C38',
      dark: '#101411',
      text: '#16120F',
      textMuted: '#5F6B64',
      border: '#E2E6E3',
      cardBg: '#FFFFFF',
      glow: 'rgba(168, 170, 165, 0.15)',
    },
    founder: 'Salazar Slytherin',
    element: 'Water',
    animal: 'Serpent',
    traits: ['Ambition', 'Cunning', 'Leadership', 'Resourcefulness'],
    motto: 'Greatness awaits those of boundless ambition',
    ghost: 'The Bloody Baron',
    commonRoom: 'Dungeon beneath the Black Lake',
  },
  ravenclaw: {
    id: 'ravenclaw',
    name: 'Ravenclaw',
    colors: {
      primary: '#172C52',
      secondary: '#A47D45',
      goldOrSilver: '#A47D45',
      text: '#16120F',
    },
    theme: {
      bg: '#FFFFFF',
      bgSubtle: '#F8F7F4',
      headerBg: 'rgba(255, 255, 255, 0.98)',
      primary: '#172C52',
      secondary: '#A47D45',
      accent: '#172C52',
      dark: '#101318',
      text: '#16120F',
      textMuted: '#636C7D',
      border: '#E2E5EA',
      cardBg: '#FFFFFF',
      glow: 'rgba(164, 125, 69, 0.15)',
    },
    founder: 'Rowena Ravenclaw',
    element: 'Air',
    animal: 'Eagle',
    traits: ['Intelligence', 'Wisdom', 'Creativity', 'Wit'],
    motto: 'Wit Beyond Measure is Man\'s Greatest Treasure',
    ghost: 'The Grey Lady',
    commonRoom: 'Ravenclaw Tower overlooking the grounds',
  },
  hufflepuff: {
    id: 'hufflepuff',
    name: 'Hufflepuff',
    colors: {
      primary: '#B08A27',
      secondary: '#222222',
      goldOrSilver: '#B08A27',
      text: '#16120F',
    },
    theme: {
      bg: '#FFFFFF',
      bgSubtle: '#F8F7F4',
      headerBg: 'rgba(255, 255, 255, 0.98)',
      primary: '#B08A27',
      secondary: '#222222',
      accent: '#B08A27',
      dark: '#111111',
      text: '#16120F',
      textMuted: '#6B665E',
      border: '#EAE6DC',
      cardBg: '#FFFFFF',
      glow: 'rgba(176, 138, 39, 0.15)',
    },
    founder: 'Helga Hufflepuff',
    element: 'Earth',
    animal: 'Badger',
    traits: ['Loyalty', 'Dedication', 'Patience', 'Fair Play'],
    motto: 'Where They are Just and Loyal',
    ghost: 'The Fat Friar',
    commonRoom: 'Near the Kitchens, warm and sunny basement',
  },
};
