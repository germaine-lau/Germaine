import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PlayEntry from '@/components/PlayEntry';
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

const PLAY_COLUMN = 'w-full max-w-[min(100%,430px)]';

export default function PlayPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-white">
      
      {/* Sticky Header + Rule (matches homepage) */}
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

        {/* Mobile rule (inset like homepage) */}
        <div className="block min-[850px]:hidden w-full">
          <div className={`${PAGE_GUTTER} border-t border-black w-full`} />
        </div>

        {/* Desktop rule (full bleed like homepage) */}
        <div
          className="hidden min-[850px]:block w-full border-t-[1.25px] border-black"
          aria-hidden="true"
        />
      </div>

      {/* Main content (matches homepage spacing behavior) */}
      <main className="flex flex-1 flex-col w-full pt-11 md:pt-12">
        <div className={`flex w-full justify-center ${PAGE_GUTTER}`}>
          <div
            className={`flex flex-col gap-[64px] min-[750px]:gap-[72px] ${PLAY_COLUMN}`}
          >
            {PLAY_ENTRIES.map((entry) => (
              <PlayEntry key={entry.id} {...entry} />
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <div className="w-full flex-shrink-0 pt-24 min-[750px]:pt-32">
        <Footer leftContent="hello@germainelau.com" rightContent="2026" />
      </div>
    </div>
  );
}