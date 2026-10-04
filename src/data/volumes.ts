import { Volume } from '../types';

export const VOLUMES: Volume[] = [
  {
    id: 'vol-01',
    volNum: 1,
    volString: 'VOL. 01',
    title: 'THE GREAT GATSBY',
    author: 'F. Scott Fitzgerald',
    price: 28.00,
    category: 'CLASSICS',
    spineColor: '#1A293E', // Deep Navy Blue
    accentColor: '#D4AF37',
    foilColor: '#E2C26E',
    publishedYear: 1925,
    isbn: '978-0743273565',
    stockCount: 18,
    synopsis: 'F. Scott Fitzgerald’s third novel stands as the supreme triumph of his career. The story of the fabulously wealthy Jay Gatsby and his new love for Daisy Buchanan is an exquisitely crafted tale of America in the 1920s.',
    bindingSpecs: {
      clothDescription: 'Midnight blue buckram cloth with celestial 24kt gold foil stamping and gilded top edge.',
      format: 'CROWN OCTAVO',
      paperStock: '120GSM ARCHIVAL WOVE'
    },
    physicalDimensions: {
      widthPx: 44,
      heightPx: 440,
      pageCount: 208
    },
    samplePages: {
      page1: {
        header: 'THE GROOVE ARCHIVAL EDITIONS · VOL. 01',
        subHeader: 'PRINTED AT THE ATELIER IN STOCKHOLM, SWEDEN',
        epigraph: '“Then wear the golden hat, if that will move her; If you can bounce high, bounce for her too, Till she cry ‘Lover, gold-hatted, high-bouncing lover, I must have you!’” — Thomas Parke D’Invilliers',
        bodyText: 'This preserved octavo volume replicates the first 1925 Charles Scribner’s Sons typesetting on acid-free wove rag, retaining the original paragraph spacing and authorial punctuation.'
      },
      page2: {
        chapterTitle: 'CHAPTER I',
        dropCap: 'I',
        bodyParagraphs: [
          'n my younger and more vulnerable years my father gave me some advice that I’ve been turning over in my mind ever since.',
          '“Whenever you feel like criticizing any one,” he told me, “just remember that all the people in this world haven’t had the advantages that you’ve had.”',
          'He didn’t say any more, but we’ve always been unusually communicative in a reserved way, and I understood that he meant a great deal more than that. In consequence, I’m inclined to reserve all judgments, a habit that has opened up many curious natures to me and also made me the victim of not a few veteran bores.'
        ]
      }
    }
  },
  {
    id: 'vol-02',
    volNum: 2,
    volString: 'VOL. 02',
    title: '1984',
    author: 'George Orwell',
    price: 24.00,
    category: 'FICTION',
    spineColor: '#6B1D2F', // Deep Crimson
    accentColor: '#E5A93C',
    foilColor: '#F0C767',
    publishedYear: 1949,
    isbn: '978-0451524935',
    stockCount: 22,
    synopsis: 'Winston Smith toes the Party line, rewriting history to satisfy the Ministry of Truth. With each lie he writes, Winston grows to hate the Party that seeks power for its own sake and persecutes those who dare to commit thoughtcrimes.',
    bindingSpecs: {
      clothDescription: 'Industrial crimson linen with cold-stamped black foil rules and surveillance eye blind deboss.',
      format: 'STANDARD FOOLSCAP',
      paperStock: 'SWEDISH ROUGH UNBLEACHED'
    },
    physicalDimensions: {
      widthPx: 46,
      heightPx: 430,
      pageCount: 328
    },
    samplePages: {
      page1: {
        header: 'WAR IS PEACE · FREEDOM IS SLAVERY · IGNORANCE IS STRENGTH',
        subHeader: 'ARCHIVAL FOOLSCAP EDITION · LONDON & SOHO',
        epigraph: '“Who controls the past controls the future. Who controls the present controls the past.”',
        bodyText: 'Hand-set typography utilizing the historical 1949 Secker & Warburg typeface. Blind debossed doublethink insignia on unvarnished buckram.'
      },
      page2: {
        chapterTitle: 'PART ONE · CHAPTER I',
        dropCap: 'I',
        bodyParagraphs: [
          't was a bright cold day in April, and the clocks were striking thirteen. Winston Smith, his chin nuzzled into his breast in an effort to escape the vile wind, slipped quickly through the glass doors of Victory Mansions, though not quickly enough to prevent a swirl of gritty dust from entering along with him.',
          'The hallway smelt of boiled cabbage and old rag mats. At one end of it a coloured poster, too large for indoor display, had been tacked to the wall. It depicted simply an enormous face, more than a metre wide: the face of a man of about forty-five, with a heavy black moustache and ruggedly handsome features.'
        ]
      }
    }
  },
  {
    id: 'vol-03',
    volNum: 3,
    volString: 'VOL. 03',
    title: 'DORIAN GRAY',
    author: 'Oscar Wilde',
    price: 26.00,
    category: 'CLASSICS',
    spineColor: '#184733', // Deep Emerald Green
    accentColor: '#D8B153',
    foilColor: '#ECD188',
    publishedYear: 1890,
    isbn: '978-0141439570',
    stockCount: 15,
    synopsis: 'Oscar Wilde’s story of a fashionable young man who sells his soul for eternal youth and beauty remains as provocative and scandalous today as it was when first published.',
    bindingSpecs: {
      clothDescription: 'Decadent hunter green velvet-grain bookcloth with gilded floral cartouche and silk marker ribbon.',
      format: 'IMPERIAL OCTAVO',
      paperStock: '140GSM VELLUM LAID'
    },
    physicalDimensions: {
      widthPx: 48,
      heightPx: 445,
      pageCount: 256
    },
    samplePages: {
      page1: {
        header: 'THE PREFACE BY OSCAR WILDE',
        subHeader: 'DECEMBER MMXXVI ATELIER EDITION',
        epigraph: '“The artist is the creator of beautiful things. To reveal art and conceal the artist is art’s aim.”',
        bodyText: 'Preserved from the 1891 Ward, Lock and Company unabridged release with uncut deckle fore-edge and deep gold leaf headbands.'
      },
      page2: {
        chapterTitle: 'CHAPTER I',
        dropCap: 'T',
        bodyParagraphs: [
          'he studio was filled with the rich odour of roses, and when the light summer wind stirred amidst the trees of the garden, there came through the open door the heavy scent of the lilac, or the more delicate perfume of the pink-flowering thorn.',
          'From the corner of the divan of Persian saddle-bags on which he was lying, smoking, as was his custom, innumerable cigarettes, Lord Henry Wotton could just catch the gleam of the honey-sweet and honey-coloured blossoms of a laburnum, whose tremulous branches seemed hardly able to bear the burden of a beauty so flame-like as theirs.'
        ]
      }
    }
  },
  {
    id: 'vol-04',
    volNum: 4,
    volString: 'VOL. 04',
    title: 'PRIDE & PREJUDICE',
    author: 'Jane Austen',
    price: 22.00,
    category: 'CLASSICS',
    spineColor: '#3A4B45', // Slate Sage
    accentColor: '#DEC177',
    foilColor: '#F4DD9A',
    publishedYear: 1813,
    isbn: '978-0141439518',
    stockCount: 34,
    synopsis: 'Few have failed to be charmed by the witty and independent spirit of Elizabeth Bennet in Austen’s beloved masterpiece of romantic clash, social folly, and enduring affection.',
    bindingSpecs: {
      clothDescription: 'Regency sage cotton weave with blind debossed Regency filigree and copper foil lettering.',
      format: 'POCKET DUODECIMO',
      paperStock: '110GSM COTTON RAG'
    },
    physicalDimensions: {
      widthPx: 42,
      heightPx: 420,
      pageCount: 432
    },
    samplePages: {
      page1: {
        header: 'HERTFORDSHIRE · FIRST IMPRESSIONS',
        subHeader: 'PRESERVED THREE-VOLUME OCTAVO IN ONE',
        epigraph: '“It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.”',
        bodyText: 'Faithful reproduction of the 1813 Thomas Egerton Whitehall edition, bound in Regency sage linen.'
      },
      page2: {
        chapterTitle: 'CHAPTER I',
        dropCap: 'H',
        bodyParagraphs: [
          'owever little known the feelings or views of such a man may be on his first entering a neighbourhood, this truth is so well fixed in the minds of the surrounding families, that he is considered the rightful property of some one or other of their daughters.',
          '“My dear Mr. Bennet,” said his lady to him one day, “have you heard that Netherfield Park is let at last?” Mr. Bennet replied that he had not.'
        ]
      }
    }
  },
  {
    id: 'vol-05',
    volNum: 5,
    volString: 'VOL. 05',
    title: 'FRANKENSTEIN',
    author: 'Mary Shelley',
    price: 25.00,
    category: 'CLASSICS',
    spineColor: '#96681E', // Mustard Ochre
    accentColor: '#F2D382',
    foilColor: '#F7E2A9',
    publishedYear: 1818,
    isbn: '978-0141439471',
    stockCount: 19,
    synopsis: 'Mary Shelley’s chilling gothic tale of a scientist obsessed with creating life and the lonely, vengeful creature he abandons to an unforgiving world.',
    bindingSpecs: {
      clothDescription: 'Ochre buckram cloth with galvanic lightning blind impressions and hand-sewn black headbands.',
      format: 'MEDIUM OCTAVO',
      paperStock: '130GSM RUSTIC ANTIQUE'
    },
    physicalDimensions: {
      widthPx: 52,
      heightPx: 450,
      pageCount: 280
    },
    samplePages: {
      page1: {
        header: 'THE MODERN PROMETHEUS · 1818 TEXT',
        subHeader: 'MARY WOLLSTONECRAFT SHELLEY',
        epigraph: '“Did I request thee, Maker, from my clay To mould me Man, did I solicit thee From darkness to promote me?” — Paradise Lost',
        bodyText: 'Preserving the original 1818 Lackington, Hughes, Harding, Mavor, & Jones text before the 1831 authorial sanitization.'
      },
      page2: {
        chapterTitle: 'LETTER I · TO MRS. SAVILLE, ENGLAND',
        dropCap: 'Y',
        bodyParagraphs: [
          'ou will rejoice to hear that no disaster has accompanied the commencement of an enterprise which you have regarded with such evil forebodings. I arrived here yesterday, and my first task is to assure my dear sister of my welfare and increasing confidence in the success of my undertaking.',
          'I am already far north of London, and as I walk in the streets of Petersburgh, I feel a cold northern breeze play upon my cheeks, which braces my nerves and fills me with delight.'
        ]
      }
    }
  },
  {
    id: 'vol-06',
    volNum: 6,
    volString: 'VOL. 06',
    title: 'THE HOBBIT',
    author: 'J.R.R. Tolkien',
    price: 32.00,
    category: 'FICTION',
    spineColor: '#123D2D', // Dark Forest Green
    accentColor: '#DDB354',
    foilColor: '#EFCD7A',
    publishedYear: 1937,
    isbn: '978-0547928227',
    stockCount: 28,
    synopsis: 'Bilbo Baggins is a hobbit who enjoys a comfortable, unambitious life, rarely traveling further than his pantry in Bag End. But his contentment is disturbed when Gandalf arrives with thirteen dwarves.',
    bindingSpecs: {
      clothDescription: 'Deep moss library buckram embossed with Tolkien’s runic dragon glyph in lustrous green-gold foil.',
      format: 'ROYAL OCTAVO',
      paperStock: '135GSM MAP-GRADE HEAVY'
    },
    physicalDimensions: {
      widthPx: 50,
      heightPx: 435,
      pageCount: 310
    },
    samplePages: {
      page1: {
        header: 'THERE AND BACK AGAIN · A HOBBIT’S HOLIDAY',
        subHeader: 'FEATURING RUNIC CHARTS AND THORIN’S MAP',
        epigraph: '“Far over the misty mountains cold, To dungeons deep and caverns old...”',
        bodyText: 'Printed in deep moss cloth with red and gold foil stamping and illustrated endpapers of the Lonely Mountain.'
      },
      page2: {
        chapterTitle: 'CHAPTER I · AN UNEXPECTED PARTY',
        dropCap: 'I',
        bodyParagraphs: [
          'n a hole in the ground there lived a hobbit. Not a nasty, dirty, wet hole, filled with the ends of worms and an oozy smell, nor yet a dry, bare, sandy hole with nothing in it to sit down on or to eat: it was a hobbit-hole, and that means comfort.',
          'It had a perfectly round door like a porthole, painted green, with a shiny yellow brass knob in the exact middle. The door opened on to a tube-shaped hall like a tunnel: a very comfortable tunnel without smoke, with panelled walls, and floors tiled and carpeted.'
        ]
      }
    }
  },
  {
    id: 'vol-07',
    volNum: 7,
    volString: 'VOL. 07',
    title: 'CATCHER IN THE RYE',
    author: 'J.D. Salinger',
    price: 21.00,
    category: 'FICTION',
    spineColor: '#6B1B26', // Deep Wine Red
    accentColor: '#D7AE52',
    foilColor: '#ECD188',
    publishedYear: 1951,
    isbn: '978-0316769488',
    stockCount: 16,
    synopsis: 'Holden Caulfield’s unforgettable journey through Manhattan after being expelled from prep school remains the definitive American portrait of alienation, innocence, and vulnerability.',
    bindingSpecs: {
      clothDescription: 'Crimson cardinal cloth with minimalist debossed gold title and unvarnished raw edge spine.',
      format: 'STANDARD TRADE',
      paperStock: '115GSM NATURAL WOVE'
    },
    physicalDimensions: {
      widthPx: 40,
      heightPx: 425,
      pageCount: 240
    },
    samplePages: {
      page1: {
        header: 'LITTLE, BROWN & COMPANY · NEW YORK MMXXVI',
        subHeader: 'ARCHIVAL RESTORATION OF 1951 CASING',
        epigraph: '“TO MY MOTHER”',
        bodyText: 'Minimalist burgundy bookcloth without dust jacket distractions, exactly as requested by J.D. Salinger.'
      },
      page2: {
        chapterTitle: 'CHAPTER 1',
        dropCap: 'I',
        bodyParagraphs: [
          'f you really want to hear about it, the first thing you’ll probably want to know is where I was born, and what my lousy childhood was like, and how my parents were occupied and all before they had me, and all that David Copperfield kind of crap, but I don’t feel like going into it, if you want to know the truth.',
          'In the first place, that stuff bores me, and in the second place, my parents would have about two hemorrhages apiece if I told anything pretty personal about them.'
        ]
      }
    }
  },
  {
    id: 'vol-08',
    volNum: 8,
    volString: 'VOL. 08',
    title: 'THE LITTLE PRINCE',
    author: 'Antoine de Saint-Exupéry',
    price: 20.00,
    category: 'PHILOSOPHY',
    spineColor: '#1D2A44', // Midnight Indigo
    accentColor: '#E6C068',
    foilColor: '#F4D994',
    publishedYear: 1943,
    isbn: '978-0156012195',
    stockCount: 40,
    synopsis: 'A pilot stranded in the desert meets an enigmatic little prince from asteroid B-612. A transcendent poetic fable that reminds adults what it truly means to see with the heart.',
    bindingSpecs: {
      clothDescription: 'Starlit deep indigo cloth featuring asteroid constellation blind debossing and gold star foil.',
      format: 'SQUARE FOLIO',
      paperStock: '150GSM FRENCH ARCHIVAL'
    },
    physicalDimensions: {
      widthPx: 38,
      heightPx: 410,
      pageCount: 96
    },
    samplePages: {
      page1: {
        header: 'TO LÉON WERTH WHEN HE WAS A LITTLE BOY',
        subHeader: 'ASTEROID B-612 · ARCHIVAL FOLIO',
        epigraph: '“One sees clearly only with the heart. Anything essential is invisible to the eyes.”',
        bodyText: 'Restored watercolor vignettes printed on heavy 150gsm French wove stock with gilded indigo cloth.'
      },
      page2: {
        chapterTitle: 'CHAPTER I',
        dropCap: 'O',
        bodyParagraphs: [
          'nce when I was six years old I saw a magnificent picture in a book, called True Stories from Nature, about the primeval forest. It was a picture of a boa constrictor in the act of swallowing an animal.',
          'In the book it said: “Boa constrictors swallow their prey whole, without chewing it. After that they are not able to move, and they sleep through the six months that they need for digestion.” I pondered deeply, then, over the adventures of the jungle. And after some work with a coloured pencil I succeeded in making my first drawing.'
        ]
      }
    }
  },
  {
    id: 'vol-09',
    volNum: 9,
    volString: 'VOL. 09',
    title: 'THE BOYFRIEND',
    author: 'Freida McFadden',
    price: 27.00,
    category: 'THRILLER',
    spineColor: '#4A141E', // Blood Burgundy
    accentColor: '#D8AE52',
    foilColor: '#ECD188',
    publishedYear: 2024,
    isbn: '978-1728296210',
    stockCount: 30,
    synopsis: 'The explosive psychological thriller from Freida McFadden. Sydney feels she has finally met the perfect partner in handsome Dr. Tom Martinez, until dead women from a dating app begin surfacing across Manhattan.',
    bindingSpecs: {
      clothDescription: 'Modern noir cloth edition with blood-burgundy thread binding and razor-sharp typographic foil.',
      format: 'TRADE FOLIO',
      paperStock: 'SMOOTH HIGH-BULK'
    },
    physicalDimensions: {
      widthPx: 46,
      heightPx: 435,
      pageCount: 360
    },
    samplePages: {
      page1: {
        header: 'A NOVEL OF SUSPENSE · NEW YORK NOIR',
        subHeader: 'FREIDA MCFADDEN ARCHIVAL BINDING',
        epigraph: '“He is charming. He is attentive. And he knows exactly what you fear most.”',
        bodyText: 'Specialized thriller printing with high-contrast sharp serif typography on velvety high-bulk stock.'
      },
      page2: {
        chapterTitle: 'CHAPTER 1 · SYDNEY',
        dropCap: 'T',
        bodyParagraphs: [
          'he restaurant is called Le Bistro, and it is far too nice for a guy I met on a dating app three days ago.',
          'I’m sitting in a plush velvet booth near the back, nervously checking my lipstick in my compact mirror. Dating in Manhattan in your late twenties is a special circle of hell, but Tom Martinez seemed different from his first message: articulate, polite, and handsome in a way that feels almost too good to be true.'
        ]
      }
    }
  },
  {
    id: 'vol-10',
    volNum: 10,
    volString: 'VOL. 10',
    title: 'THE MOUNTAIN IS YOU',
    author: 'Brianna Wiest',
    price: 23.00,
    category: 'MENTAL HEALTH',
    spineColor: '#2D3B48', // Slate Charcoal
    accentColor: '#D6AF55',
    foilColor: '#EACD85',
    publishedYear: 2020,
    isbn: '978-1949759228',
    stockCount: 25,
    synopsis: 'A book about self-sabotage. Why we do it, when we do it, and how to stop doing it—for good. By learning to step out of your own way, you can scale the internal mountain to your true self.',
    bindingSpecs: {
      clothDescription: 'Basalt slate cloth with topographical contours blind debossed along the front cover and spine.',
      format: 'DEMI OCTAVO',
      paperStock: '125GSM TEXTURED MATTE'
    },
    physicalDimensions: {
      widthPx: 42,
      heightPx: 425,
      pageCount: 248
    },
    samplePages: {
      page1: {
        header: 'TRANSFORMING SELF-SABOTAGE INTO SELF-MASTERY',
        subHeader: 'ARCHIVAL PSYCHOLOGY PRESS',
        epigraph: '“Your new life is going to cost you your old one. It’s going to cost you your comfort zone and your coping mechanisms.”',
        bodyText: 'Basalt textured clothbound casing debossed with contour lines of geological fortitude.'
      },
      page2: {
        chapterTitle: 'CHAPTER 1 · THE MOUNTAIN',
        dropCap: 'S',
        bodyParagraphs: [
          'elf-sabotage is what happens when you have two conflicting desires: one is conscious, and the other is unconscious.',
          'You know what you want to achieve, but there is a hidden reason why you are resisting it. To step out of self-sabotage, you don’t need more willpower; you need to understand the unmet psychological need your resistance is trying to protect.'
        ]
      }
    }
  },
  {
    id: 'vol-11',
    volNum: 11,
    volString: 'VOL. 11',
    title: 'THE PSYCHOLOGY OF MONEY',
    author: 'Morgan Housel',
    price: 25.00,
    category: 'MONEY & MIND',
    spineColor: '#173E2E', // Deep Spruce Green
    accentColor: '#D4AF37',
    foilColor: '#E8CA73',
    publishedYear: 2020,
    isbn: '978-0857197689',
    stockCount: 24,
    synopsis: 'Morgan Housel explores 19 short stories on the strange ways people think about money. Financial success is not a hard science, but a soft skill where behavior trumps raw intelligence.',
    bindingSpecs: {
      clothDescription: 'Deep spruce archival cloth with emerald endpapers and matte bronze coin insignia.',
      format: 'ROYAL OCTAVO',
      paperStock: '340GSM LAID'
    },
    physicalDimensions: {
      widthPx: 45,
      heightPx: 435,
      pageCount: 256
    },
    samplePages: {
      page1: {
        header: 'TIMELESS LESSONS ON WEALTH, GREED, AND HAPPINESS',
        subHeader: 'COLLINS & OCTAVO MMXXVI',
        epigraph: '“Doing well with money has a little to do with how smart you are and a lot to do with how you behave.”',
        bodyText: 'Spruce cloth with emerald ribbon and debossed coin hallmark. Typeset in classical Baskerville.'
      },
      page2: {
        chapterTitle: 'INTRODUCTION · THE GREATEST SHOW ON EARTH',
        dropCap: 'R',
        bodyParagraphs: [
          'onald James Read was an American philanthropist, investor, janitor, and gas station attendant. Read grew up in rural Vermont, the first person in his family to graduate from high school.',
          'When he died in 2014 at age 92, the former janitor made international headlines: he left $2 million to his stepchildren and more than $6 million to his local library and hospital. Read had simply lived frugally and compound interest did the rest.'
        ]
      }
    }
  },
  {
    id: 'vol-12',
    volNum: 12,
    volString: 'VOL. 12',
    title: 'MAYBE YOU SHOULD TALK TO SOMEONE',
    author: 'Lori Gottlieb',
    price: 24.00,
    category: 'MENTAL HEALTH',
    spineColor: '#783A1B', // Warm Cognac Leather
    accentColor: '#E5BE64',
    foilColor: '#F5DC94',
    publishedYear: 2019,
    isbn: '978-1328662057',
    stockCount: 20,
    synopsis: 'A therapist, her therapist, and our lives revealed. Lori Gottlieb takes us behind the scenes of her therapy practice and reveals her own struggles, offering a deeply human, funny, and wise look at our inner lives.',
    bindingSpecs: {
      clothDescription: 'Cognac heritage cloth with warm gold serif type and hand-tipped marbled endpapers.',
      format: 'LARGE CROWN',
      paperStock: '120GSM CREAM BULK'
    },
    physicalDimensions: {
      widthPx: 50,
      heightPx: 440,
      pageCount: 432
    },
    samplePages: {
      page1: {
        header: 'A THERAPIST, HER THERAPIST, AND OUR LIVES REVEALED',
        subHeader: 'OCTAVO & FOLIO PRESS',
        epigraph: '“We are all more human than otherwise.” — Harry Stack Sullivan',
        bodyText: 'Hand-sewn library binding in warm cognac cloth with hand-tipped marbled endpapers.'
      },
      page2: {
        chapterTitle: 'CHAPTER 1 · SKINS',
        dropCap: 'H',
        bodyParagraphs: [
          'ello, I say, extending my hand to the new patient sitting in my waiting room. He doesn’t take it. Instead, he glances at his watch, lets out an exaggerated sigh, and stands up.',
          'John is in his early forties, wearing an expensive tailored suit and an expression that suggests he would rather be undergoing dental surgery without anesthesia than sitting in a psychotherapist’s office.'
        ]
      }
    }
  }
];

export const INITIAL_ARCHIVE_ORDERS: import('../types').OrderRecord[] = [
  {
    id: 'GRV-410531',
    date: '9/16/2026',
    status: 'CONFIRMED',
    recipientName: 'Shahzad',
    recipientEmail: 'eleanor@archival.org',
    streetAddress: '452 Lexington Avenue, Apt 8B',
    city: 'New York',
    postalCode: '10017',
    items: [
      {
        volString: 'VOL. 04',
        title: 'PRIDE & PREJUDICE',
        author: 'Jane Austen',
        price: 22.00,
        quantity: 1
      }
    ],
    total: 22.00
  }
];
