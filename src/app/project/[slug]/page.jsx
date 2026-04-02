import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProjectRowOverlay from '@/components/ProjectRowOverlay';
import ProjectMediaColumn from '@/components/ProjectMediaColumn';
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
  mediaItems: [
    {
      type: 'video',
      src: '/videos/CP_Square_Katz_HERO_V3_260207_FINAL_CC_MIX_CAPTIONS.mp4',
      aspectRatio: '16 / 9',
      loop: true,
    },
    { type: 'image', src: '/images/TimesChange_01.png', aspectRatio: '1 / 1' },
    { type: 'image', src: '/images/000001440034.jpg', aspectRatio: '3 / 4' },
    { type: 'image', src: '/images/Faregates.png', aspectRatio: '16 / 9' },
    { type: 'image', src: '/images/000001440019.jpg', aspectRatio: '3 / 4' },
    { type: 'image', src: '/images/TimesChange_03.png' },
    { type: 'image', src: '/images/000001440025.jpg' },
    { type: 'image', src: '/images/TimesChange_02.png' },
    { type: 'image', src: '/images/000001450017.jpg' },
  ],
};

function CreditsBlock({ credits }) {
  if (!credits) return null;

  return (
    <div className="mt-10 flex flex-col gap-3 min-[750px]:gap-[12px]">
      <div className="w-fit rounded-[18px] border border-black px-[8px] py-[2.25px] font-arial text-[10px] leading-[1.2] tracking-[.1] text-black min-[750px]:text-[9px] min-[750px]:leading-[1.1]">
        Credits
      </div>

      <p
        className="max-w-[220px] whitespace-pre-wrap font-arial text-[11px] leading-[1.35] tracking-[.1px] text-black min-[750px]:max-w-[220px] min-[750px]:text-[9px] min-[750px]:leading-[1.26]"
        dangerouslySetInnerHTML={{
          __html: Array.isArray(credits) ? credits[0] : credits,
        }}
      />
    </div>
  );
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;

  if (slug !== 'katz') {
    return <div style={{ padding: '40px' }}>Project not found</div>;
  }

  return (
    <div className="min-h-screen w-full bg-white text-black">
      {/* MOBILE / TABLET HEADER */}
      <header className={`border-b border-black pb-0 min-[850px]:hidden ${PAGE_GUTTER}`}>
        <Header
          logoName="germaine"
          tagline={'multidisciplinary designer + art director \n→ based in San Francisco, CA'}
          navItems={DEFAULT_NAV_ITEMS}
        />
      </header>

      {/* DESKTOP FIXED HEADER */}
      <header
        className={`hidden min-[850px]:fixed min-[850px]:inset-x-0 min-[850px]:top-0 min-[850px]:z-50 min-[850px]:block min-[850px]:border-b min-[850px]:border-black min-[850px]:bg-white min-[850px]:pb-7 ${PAGE_GUTTER}`}
      >
        <Header
          logoName="germaine"
          tagline={'multidisciplinary designer + art director \n→ based in San Francisco, CA'}
          navItems={DEFAULT_NAV_ITEMS}
        />
      </header>

      {/* MOBILE / TABLET LAYOUT */}
      <main className="min-[850px]:hidden">
        <ProjectRowOverlay {...KATZ_PROJECT} />
      </main>

      {/* DESKTOP LAYOUT */}
      <main className="hidden min-[850px]:block min-[850px]:w-full min-[850px]:pt-[160px] min-[850px]:pb-[56px]">
        <section
          className={`${PAGE_GUTTER} min-[850px]:grid min-[850px]:grid-cols-[260px,minmax(0,1fr)] min-[850px]:gap-[36px] min-[1200px]:grid-cols-[280px,minmax(0,1fr)] min-[1200px]:gap-[44px]`}
        >
          <aside className="min-[850px]:relative">
            <div className="min-[850px]:fixed min-[850px]:top-[190px] min-[850px]:w-[260px] min-[1200px]:w-[280px]">
              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-3 min-[750px]:gap-[14px]">
                  <h1 className="max-w-[300px] font-weird-serif text-[2.5rem] italic leading-[1.02] tracking-[-0.01em] text-black min-[750px]:text-[35px]">
                    {KATZ_PROJECT.title}
                  </h1>

                  <p className="font-arial font-semibold text-[11px] leading-[1.35] tracking-[.1px] text-black min-[750px]:text-[9px] min-[750px]:leading-[1.26]">
                    {KATZ_PROJECT.category}
                  </p>

                  <p className="max-w-[300px] whitespace-pre-line font-arial text-[13px] leading-[1.35] text-black min-[750px]:max-w-[240px] min-[750px]:text-[10px] min-[750px]:leading-[1.25]">
                    {KATZ_PROJECT.description}
                  </p>
                </div>

                <CreditsBlock credits={KATZ_PROJECT.credits} />
              </div>
            </div>
          </aside>

          <div>
            <ProjectMediaColumn mediaItems={KATZ_PROJECT.mediaItems} />
          </div>
        </section>
      </main>

      {/* MOBILE / TABLET FOOTER */}
      <div className="border-t border-black min-[850px]:hidden">
        <Footer leftContent="hello@germainelau.com" rightContent="2026" />
      </div>

      {/* DESKTOP FIXED FOOTER */}
      <div className="hidden min-[850px]:fixed min-[850px]:inset-x-0 min-[850px]:bottom-0 min-[850px]:z-50 min-[850px]:block min-[850px]:bg-white">
        <Footer leftContent="hello@germainelau.com" rightContent="2026" />
      </div>
    </div>
  );
}