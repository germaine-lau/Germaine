function Footer({ leftContent, rightContent, className = '' }) {
  return (
    <footer className={`w-full ${className}`} role="contentinfo">
      <div
        className="relative left-1/2 right-1/2 ml-[-50vw] mr-[-50vw] w-screen border-t border-black"
        aria-hidden="true"
      />

      <div className="h-8 flex items-center justify-between px-5">
        <p className="text-[10.753px] font-bold leading-[1.06] text-black tracking-[-0.1075px]">
          {leftContent}
        </p>

        <p className="text-[10.753px] font-bold leading-[1.06] text-black tracking-[-0.1075px] text-right">
          {rightContent}
        </p>
      </div>
    </footer>
  );
}

export default Footer;