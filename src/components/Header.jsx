import Logo from './Logo';
import NavLinks from './NavLinks';

function Header({ logoName, tagline, navItems, className = '' }) {
  return (
    <header
    className={`w-full pt-7 pb-8 min-[850px]:pt-9 min-[850px]:pb-0 ${className}`}
      role="banner"
    >
    <div className="w-full min-[850px]:-ml-[4px]">
        <div className="flex flex-col gap-5 min-[850px]:flex-row min-[850px]:items-center min-[850px]:justify-between">
          <div className="min-w-0">
            <div className="flex flex-col gap-5 min-[850px]:flex-row min-[850px]:items-center min-[850px]:gap-12">
              <div className="flex flex-col gap-5">
                <Logo
                />

                {tagline && (
                  <p className="max-w-[320px] whitespace-pre-wrap text-left font-bold text-[10.75px] leading-[1.06] tracking-[-0.1075px] text-black min-[850px]:max-w-[237px] min-[850px]:hidden">
                    {tagline}
                  </p>
                )}

                <div className="min-[850px]:hidden">
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

          <div className="hidden min-[850px]:block shrink-0 self-center min-[850px]:-translate-y-1">
            <NavLinks items={navItems} className="shrink-0" />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;