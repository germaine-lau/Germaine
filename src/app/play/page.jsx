import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PlayEntryExplore from '@/components/PlayEntryExplore';
import { PLAY_ENTRIES } from '@/data/playEntries';
import { PAGE_GUTTER } from '../../lib/layout';

export const metadata = {
  title: 'Germaine Lau',
};

const DEFAULT_NAV_ITEMS = [
  { label: 'about', href: '/about' },
  { label: 'play', href: '/play' },
  { label: 'contact', href: 'mailto:hello@germainelau.com' },
  { label: 'linkedin', href: 'https://www.linkedin.com/in/germaine-lau/' },
];

export default function PlayPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-white">
      {/* Sticky Header + Rule */}
      <div className="sticky top-0 z-50 bg-white">
        <header className={`flex-shrink-0 pb-0 min-[850px]:pb-7 ${PAGE_GUTTER}`}>
          <Header
            logoName="germaine"
            tagline={
              'multidisciplinary designer + art director \n→ based in San Francisco, CA'
            }
            navItems={DEFAULT_NAV_ITEMS}
          />
        </header>

        {/* Mobile rule */}
        <div className="block min-[850px]:hidden w-full">
          <div className={`${PAGE_GUTTER} border-t border-black w-full`} />
        </div>

        {/* Desktop rule */}
        <div
          className="hidden min-[850px]:block w-full border-t-[1.25px] border-black"
          aria-hidden="true"
        />
      </div>

      {/* Main content */}
      <main className="flex flex-1 flex-col w-full pt-11 md:pt-9">
        <div className={`${PAGE_GUTTER} w-full`}>
          {/* Stacked layout for smaller screens */}
          <div className="mx-auto flex w-full max-w-[400px] flex-col gap-14 min-[1100px]:hidden">
  {PLAY_ENTRIES.map((entry) => (
    <div key={entry.id} className="w-full">
      <PlayEntryExplore {...entry} />
    </div>
  ))}
</div>

          {/* Absolute composed layout for larger screens */}
          <div className="relative mx-auto hidden w-full max-w-[1200px] min-h-[1800px] min-[1100px]:block">
            {/* Top left */}
            <div className="absolute left-[10%] top-[48px] w-[300px]">
            <PlayEntryExplore {...PLAY_ENTRIES[0]} />
            </div>

            {/* Right side */}
            <div className="absolute right-[8%] top-[280px] w-[420px]">
            <PlayEntryExplore {...PLAY_ENTRIES[1]} />
            </div>

            {/* Lower left */}
            <div className="absolute left-[5%] top-[820px] w-[300px]">
            <PlayEntryExplore {...PLAY_ENTRIES[2]} />
            </div>

            {/* Bottom right */}
            <div className="absolute right-[10%] top-[1100px] w-[360px]">
              <PlayEntryExplore {...PLAY_ENTRIES[3]} />
            </div>



          </div>
        </div>
      </main>

      {/* Footer */}
      <div className="w-full flex-shrink-0 pt-10 min-[750px]:pt-16">
        <Footer leftContent="hello@germainelau.com" rightContent="2026" />
      </div>
    </div>
  );
}