import Link from 'next/link';
import Logo from './Logo';
import NavLinks from './NavLinks';

function Header({ logoName, tagline, navItems, onLogoClick, className = '' }) {
  return (
    <header
      className={`w-full pt-7 pb-8 min-[850px]:pt-9 min-[850px]:pb-0 ${className}`}
      role="banner"
    >
      <div className="w-full min-[850px]:-ml-[4px]">
        <div className="flex flex-col gap-5 min-[750px]:flex-row min-[750px]:items-center min-[750px]:justify-between">
          <div className="min-w-0">
            <div className="flex flex-col gap-5 min-[850px]:flex-row min-[850px]:items-center min-[850px]:gap-12">
              <div className="flex flex-col gap-5">
                {onLogoClick ? (
                  <button
                    type="button"
                    onClick={onLogoClick}
                    aria-label="Close project"
                    className="w-fit bg-transparent p-0 text-left"
                  >
                    <Logo />
                  </button>
                ) : (
                  <Link href="/" className="inline-block w-fit">
                    <Logo />
                  </Link>
                )}

                {tagline && (
                  <p className="max-w-[320px] whitespace-pre-wrap text-left font-bold text-[10.75px] leading-[1.06] tracking-[-0.1075px] text-black min-[750px]:hidden">
                    {tagline}
                  </p>
                )}

                <div className="min-[750px]:hidden">
                  <NavLinks items={navItems} className="shrink-0" />
                </div>
              </div>

              {tagline && (
                <p className="hidden max-w-[237px] whitespace-pre-wrap text-left font-bold text-[10.75px] leading-[1.06] tracking-[-0.1075px] text-black min-[850px]:block">
                  {tagline}
                </p>
              )}
            </div>
          </div>

          <div className="hidden min-[750px]:block shrink-0 self-center">
            <NavLinks items={navItems} className="shrink-0" />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;