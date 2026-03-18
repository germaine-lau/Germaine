import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProjectRow from '@/components/ProjectRow';


const DEFAULT_NAV_ITEMS = [
  { label: 'about', href: '/about' },
  { label: 'contact', href: 'mailto:hello@germainelau.com' },
  { label: 'linkedin', href: 'https://www.linkedin.com/in/germaine-lau/' },
];

const HOMEPAGE_PROJECTS = [
  {
    title: '857-POS-PROS',
    category: 'Experiential / Print',
    description:`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`, 
credits: `Creative Direction
Sean Conroy, Christian Wildic

Design
Germaine Lau, Emanual Ilagan, John Bermingham 

Copy
Michael Grover

Program Manager
Bridget Dodd`,
mediaItems: [
  { type: 'image', src: '/images/PosPros_Cover_LowRes.png'},
  { type: 'image', src: '/images/Spread_Lotus_2.png'},
  { type: 'image', src: '/images/Spread_Grid.png'},
  { type: 'image', src: '/images/Spread_Ggiata.png'},
  { type: 'image', src: '/images/Zine_Animation.gif'},
  { type: 'image', src: '/images/Booth_01.png'},
  { type: 'image', src: '/images/Booth_02.png'},
  { type: 'image', src: '/images/Test_Brochure.png'},
  { type: 'image', src: '/images/Brochure_02.png'},
  { type: 'image', src: '/images/PosPros_Billboard.png'},
 
],
  },

  {
    title: 'Katz\'s x Square',
    category: 'Concept Development / Design',
    description: `Behind every legendary sandwich at Katz's Deli is a legendary team. That dedication, that teamwork, that pride isn't just making a living. It's building a community that's been going strong for more than 100 years.

The campaign system was built around my winning "Time" concept, celebrating Katz's and Square's balance of tradition and modernity. The campaign stretched from the Lower East Side to Delancey Station and Times Square, turning a neighborhood legacy into a citywide story.
`, 
    credits: `Creative Direction: Sean Conroy
Design: Germaine Lau, Brandon Murray, Northy Chen
Copy: Jonathan Skale
Production: Jennifer Bonilla, Terumi Fletcher`,
    credits: `Creative Direction
Sean Conroy

Design
Germaine Lau, Brandon Murray, Northy Chen

Copy
Jonathan Skale

Program Manager
Nicholas Dahl

Production
Jennifer Bonilla, Terumi Fletcher`,
mediaItems: [
  {
    type: 'video',
    src: '/videos/katzsubwayvisit_2.mp4',
    aspectRatio: '16 / 9',
    previewMode: true,
    loop: true
  },
  { type: 'image', src: '/images/TimesChange_01.png'},
  { type: 'image', src: '/images/000001440034.jpg' },
  { type: 'image', src: '/images/Faregates.png' },
  { type: 'image', src: '/images/000001440019.jpg' },
  {
    type: 'video',
    src: '/videos/Subway_Single_1.mp4',
    previewMode: true,
    loop: true
  },
  { type: 'image', src: '/images/TimesChange_03.png'},
  { type: 'image', src: '/images/000001440025.jpg'},
  { type: 'image', src: '/images/TimesChange_02.png'},
  { type: 'image', src: '/images/000001450017.jpg' },
],
},

{
  title: 'Big in Restaurants',
  category: 'Concept Development / Design',
  description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
  
 (WIP → more to come)
  `, 
  credits: `Creative Direction
Monina Velarde, Dave Brown, Sean Conroy, Shawna Wagman

Design
Germaine Lau, Grace Heitmann 

Motion
Steven Dupre

Program Manager
Bridget Dodd

Copy
Brett Baker, Jenn Young`,
  mediaItems: [
    {
      type: 'video',
      src: '/videos/Vegas_edit.mov',
      previewMode: true,
      loop: true
    },
  ],
},
  
  {
    title: 'See you in the neighborhood',
    category: 'Campaign Design',
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
  
    (WIP → more to come)
     `, 
       credits: `Creative Direction
Sean Conroy, Said Fayad

Design
Germaine Lau, Brandon Murray

Copy
Jonathan Skale

Program Manager
Nicholas Dahl

Production
Chris Mah, Stefania Mercante, Jennifer Bonilla, Terumi Fletcher`,
    mediaItems: [
      { type: 'image', src: '/images/Wildpostings_01.jpeg'},
      { type: 'image', src: '/images/Wildpostings_02.jpeg'},
      { type: 'image', src: '/images/1846344.jpg'},
  
    ],
  },
  {
    title: 'Broad Street Oyster x Square',
    category: 'Concept Development / Case Study',
    description:
     `Restaurant testimonial videos tend to follow the same formula: seated interview over restaurant b-roll. But operators don’t spend their day talking about their POS. They spend it running their restaurant.

To challenge the perception that Square isn’t built for restaurants, we built the story around a live service. We followed owner Christopher Tompkins on-the-go, shucking oysters, and naturally using Square.

The result is a testimonial that other operators instantly recognize as their own world, reinforcing that Square understands restaurants.`, 
    credits: `Creative Direction
Adrienne Heller
  
Art Direction
Germaine Lau
  
Copy 
Nikki Michaels
  
Production Company
Ian Watt, BANG!`,
  disableCarousel: true,
    mediaItems: [
      {
        type: "video",
        src: "/videos/broadstreetxsquare_sm.mp4",
        aspectRatio: "5 / 4"
      },
      {
        type: "image",
        src: "/images/lobster_spin.gif",
        hideBelowDesktop: true,
      }
    ],
  },

  {
    title: 'Web Stuff',
    category: 'Web Design / Social / Digital Ads',
    description:
     `A selection of digital work spanning campaign social content and interactive web design, including No Joke with comedian and actor Eric Wareheim and Only the Good Stuff with singer and songwriter Kelis.

Additional interactive work available upon request.`,
      credits: `Creative Direction
Dave Brown, Monina Velarde, Jess Williams
            
Design
Germaine Lau`,

    mediaItems: [
      { type: 'image', src: '/images/Eric_01.png'},
      { type: 'image', src: '/images/Eric_02.png'},
      { type: 'image', src: '/images/Eric_03.png'},
      {
        type: 'video',
        src: '/videos/Kelis_Desktop.mp4',
        previewMode: true,
        loop: true,
        aspectRatio: '36 / 29'
      },
      { type: 'image', src: '/images/Kelis_Mobile.png'},
    ], 
  },
 
];

export default function Home() {
  const pageGutter = 'px-8 min-[750px]:px-[40px]';

  return (
    <div className="min-h-screen flex flex-col bg-white w-full">
      <header className={`flex-shrink-0 pb-0 min-[850px]:pb-7 ${pageGutter}`}>
        <Header
          logoName="germaine"
          tagline={'multidisciplinary designer + art director \n→ based in San Francisco, CA'}
          navItems={DEFAULT_NAV_ITEMS}
        />
      </header>

      <div className="block min-[850px]:hidden w-full">
        <div className={`${pageGutter} border-t border-black w-full`} />
      </div>

      <div
        className="hidden min-[850px]:block w-full border-t-[1.25px] border-black"
        aria-hidden="true"
      />

      <main className="flex-1 flex flex-col w-full pt-3 -mt-2 md:mt-0 md:pt-1">
      {HOMEPAGE_PROJECTS.map((project, index) => (
  <div key={project.title}>
    <ProjectRow
      title={project.title}
      category={project.category}
      description={project.description}
      credits={project.credits}
      mediaItems={project.mediaItems}
      disableCarousel={project.disableCarousel}
    />

    {index < HOMEPAGE_PROJECTS.length - 1 && (
      <div
        className="w-full border-t-[1.25px] border-black"
        aria-hidden="true"
      />
    )}
  </div>
))}
      </main>

      <div className="w-full flex-shrink-0 pt-36">
        <Footer leftContent="hello@germainelau.com" rightContent="2026" />
      </div>
    </div>
  );
}