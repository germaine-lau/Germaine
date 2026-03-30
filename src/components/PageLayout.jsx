import { PAGE_GUTTER } from '../lib/layout';

function PageLayout({
  header,
  heroImage,
  content,
  footer,
  className = '',
  showMobileHeaderRule = true,
}) {
  const hasHero = Boolean(heroImage);

  return (
<div className={`min-h-screen flex flex-col bg-white w-full pb-0 ${className}`}>
      <div className={`flex-shrink-0 ${PAGE_GUTTER}`}>
        {header}
      </div>

      {showMobileHeaderRule && (
        <div className="block min-[850px]:hidden w-full pb-0">
          <div className={`${PAGE_GUTTER} border-t border-black w-full`} />
        </div>
      )}

      {showMobileHeaderRule && (
        <div
          className="hidden min-[850px]:block w-full border-t-[1.25px] border-black"
          aria-hidden="true"
        />
      )}

      <main
        className={`flex-1 flex flex-col pt-12 min-[750px]:pt-16 min-[1100px]:pt-16 ${PAGE_GUTTER}`}
      >
        {hasHero ? (
          <div className="flex flex-col lg:flex-row gap-12 items-stretch w-full max-w-[1320px]">
            <div className="w-full max-w-[540px] shrink-0 pt-0 lg:pt-3 self-start">
              {heroImage}
            </div>

            <div className="w-full flex-1 min-w-0 max-w-[800px] flex flex-col justify-center pt-[10px]">
              {content}
            </div>
          </div>
        ) : (
          <div className="w-full">
            {content}
          </div>
        )}
      </main>

      <div className="w-full flex-shrink-0 pt-36">
        {footer}
      </div>
    </div>
  );
}

export default PageLayout;