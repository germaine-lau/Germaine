function NavLink({ href = '#', children, className = '' }) {
  return (
    <a
      href={href}
      className={`inline-flex items-center gap-1 text-[16.867px] leading-[1.26] text-black tracking-[-0.1687px] hover:opacity-80 transition-opacity ${className}`}
    >
      <span className="bg-black size-[5px] shrink-0" aria-hidden />
      <span>{children}</span>
    </a>
  );
}

export default NavLink;
