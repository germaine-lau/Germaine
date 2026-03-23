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
    description:`Most POS marketing blend together with soft promises and generic claims. At the Bar and Restaurant Expo, we took a more direct approach. Using the blunt clarity (and slight absurdity) of lawyer ads, we called out real operator pain points with a clear directive: Call Square.

I led a rethinking of the booth collateral, breaking from typical POS conventions to create materials that made product features and seller stories engaging—something operators would actually want to pick up and spend time with.

The result was a tradeshow experience that stood out visually and made Square’s value immediately clear, saying exactly what we mean without burying it.`, 
credits: `Creative Direction
Sean Conroy, Christian Wildic

Design
Germaine Lau, Emanual Ilagan, John Bermingham 

Copy
Michael Grover`,
mediaItems: [
  { type: 'image', src: '/images/PosPros_Cover_LowRes.png'},
  { type: 'image', src: '/images/Spread_Lotus_2.png'},
  { type: 'image', src: '/images/Spread_Grid.png'},
  { type: 'image', src: '/images/Spread_Ggiata.png'},
  { type: 'image', src: '/images/Zine_Animation.gif'},
  { type: 'image', src: '/images/Booth_01.png'},
  { type: 'image', src: '/images/Booth_02.png'},
  { type: 'image', src: '/images/Brochure_Front.png'},
  { type: 'image', src: '/images/Brochure_Inside.png'},
  { type: 'image', src: '/images/PosPros_Billboard.png'},
 
],
  },

  {
    title: 'Katz\'s x Square',
    category: 'Concept / Art Direction',
    description: `Katz’s isn’t just known for its sandwiches. It’s a neighborhood icon. I developed the winning “Time” concept, using Katz’s legacy as a lens to connect Square to the neighborhood—pairing tradition with modernity in a way that reflects both brands.

The campaign nods to to the things that will always change at Katz’s while celebrating the things that never will, and it positions Square as part of that ongoing story. Spanning the Lower East Side to Delancey Station and Times Square, the work brought a neighborhood icon into a citywide presence. `, 

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
  category: 'Concept / Art Direction',
  description: `Square launched one of its largest OOH activations in Las Vegas. With 400+ placements throughout the city, the campaign cut through the city’s visual noise while reinforcing Square’s role in restaurants.

I developed the winning “Restaurant Essentials” concept for high-profile placements at Caesars Palace and Resorts World. Pairing everyday restaurant objects with Square hardware, the work framed Square as a restaurant essential—on par with kitchen labeling tape.

The campaign later expanded into Chicago’s National Restaurant Association to reach the industry’s largest gatherings of operators.`, 
  credits: `Creative Direction
Monina Velarde, Dave Brown, Sean Conroy, Shawna Wagman

Design
Germaine Lau, Grace Heitmann 

Motion
Steven Dupre

Copy
Brett Baker, Jenn Young`,
  mediaItems: [
    {
      type: 'video',
      src: '/videos/Vegas_Trimmed.mp4',
      previewMode: true,
      loop: true
    },
  ],
},
  
  {
    title: 'See you in the neighborhood',
    category: 'Art Direction',
    description: `Square’s See You in the Neighborhood campaign introduced a refreshed brand identity and tagline through a national rollout spanning 300+ OOH assets across eight major cities.

I led the design and animation of all digital and high-impact print across the campaign. The system was localized to each city, featuring real businesses to position Square as a fixture in the neighborhood.`, 
       credits: `Creative Direction
Sean Conroy, Said Fayad

Design
Germaine Lau, Brandon Murray

Copy
Jonathan Skale

Production
Chris Mah, Stefania Mercante, Jennifer Bonilla, Terumi Fletcher`,
    mediaItems: [
      { type: 'image', src: '/images/Wildpostings_01.jpeg'},
      { type: 'image', src: '/images/Wildpostings_02.jpeg'},
      { type: 'image', src: '/images/1846344.jpg'},
      { type: 'image', src: '/images/1846340.png'},
  
    ],
  },
  {
    title: 'Broad Street Oyster x Square',
    category: 'Concept / Art Direction',
    description:
     `Restaurant testimonials often follow a familiar formula: seated interviews over b-roll. But operators don’t spend their day talking about their POS. They spend it running their restaurant.

To challenge the perception that Square isn’t built for restaurants, we built the story around a live service. I shaped the approach to keep owner Christopher Tompkins in his element—running his restaurant, shucking oysters, and naturally using Square.

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
        src: "/videos/Lobster_sm_v2.mp4",
        aspectRatio: "5 / 4"
      },
      {
        type: "image",
        src: "/images/lobster_spin.gif",
        hideBelowDesktop: true,
      },
      {
        type: "image",
        src: "/images/lobster_spin.gif",
        hideBelowDesktop: true,
      }
    ],
  },

  {
    title: 'The Internet',
    category: 'Web / Interactive Design',
    description:
     `A selection of digital and interactive work spanning social content and web design. This includes talent-led series like Running a Restaurant is No Joke with Eric Wareheim and Only the Good Stuff with Kelis.

Additional work available upon request.`,
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