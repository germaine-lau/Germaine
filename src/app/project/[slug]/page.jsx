import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProjectRowOverlay from '@/components/ProjectRowOverlay';
import { PAGE_GUTTER } from '@/lib/layout';

const DEFAULT_NAV_ITEMS = [
  { label: 'about', href: '/about' },
  { label: 'contact', href: 'mailto:hello@germainelau.com' },
  { label: 'linkedin', href: 'https://www.linkedin.com/in/germaine-lau/' },
];

const KATZ_PROJECT = {
  id: 'katzs',
  slug: 'katz',
  title: "Katz's x Square",
  category: 'Experiential / Print',
  description: `Katz’s isn’t just known for its sandwiches. It’s a neighborhood icon. I developed the winning “Time” concept, using Katz’s legacy as a lens to connect Square to the neighborhood—pairing tradition with modernity in a way that reflects both brands.

The campaign nods to the things that will always change at Katz’s while celebrating the things that never will, and it positions Square as part of that ongoing story. Spanning the Lower East Side to Delancey Station and Times Square, the work brought a neighborhood icon into a citywide presence.`,
  credits: [
    `Creative Direction
Sean Conroy

Design
Germaine Lau, Brandon Murray, Northy Chen

Copy
Jonathan Skale

Production
Jennifer Bonilla, Terumi Fletcher`,
  ],
  type: 'video',
  src: '/videos/katz_vertical_thumbnail.mp4',
  fitClass: 'object-cover object-[50%_20%]',
  heightClass: 'h-[46vh] min-h-[500px] min-[750px]:h-[62vh]',
  widthClass:
    'w-[78vw] min-[600px]:w-[58vw] min-[850px]:w-[36vw] min-[1200px]:w-[28vw]',
  mediaItems: [
    {
      type: 'video',
      src: '/videos/CP_Square_Katz_HERO_V3_260207_FINAL_CC_MIX_CAPTIONS.mp4',
      aspectRatio: '16 / 9',
      loop: true,
    },
    { type: 'image', src: '/images/TimesChange_01.png' },
    { type: 'image', src: '/images/000001440034.jpg' },
    { type: 'image', src: '/images/Faregates.png' },
    { type: 'image', src: '/images/000001440019.jpg' },
    { type: 'image', src: '/images/TimesChange_03.png' },
    { type: 'image', src: '/images/000001440025.jpg' },
    { type: 'image', src: '/images/TimesChange_02.png' },
    { type: 'image', src: '/images/000001450017.jpg' },
  ],
  modal: {},
};

export default async function ProjectPage({ params }) {
  const { slug } = await params;

  if (slug !== 'katz') {
    return <div style={{ padding: '40px' }}>Project not found</div>;
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-white">
<header className={`min-[850px]:pb-7 flex-shrink-0 pb-0 border-b border-black ${PAGE_GUTTER}`}>
        <Header
          logoName="germaine"
          tagline={'multidisciplinary designer + art director \n→ based in San Francisco, CA'}
          navItems={DEFAULT_NAV_ITEMS}
        />
      </header>

      <main className="flex w-full flex-1 min-h-0 overflow-y-auto">
        <div className="w-full">
          <ProjectRowOverlay {...KATZ_PROJECT} />
        </div>
      </main>

      <div className="w-full flex-shrink-0">
        <Footer leftContent="hello@germainelau.com" rightContent="2026" />
      </div>
    </div>
  );
}