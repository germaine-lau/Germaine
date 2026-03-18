"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function NavLinks({ items = [], className = "" }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Main navigation" className={className}>
      <ul className="flex items-center gap-6 min-[750px]:gap-[37px]" role="list">
        {items.map((item) => {
       const href = item.href ?? "#";
       const cleanHref = href.split("#")[0];
       const isActive = pathname === cleanHref;
       const isExternal = href.startsWith("http");

          const linkClass =
            "inline-flex items-center gap-1.5 text-[13px] leading-[1.26] text-black tracking-[-0.1687px]";

          const squareClass = `size-[5px] shrink-0 transition-all duration-200 ${
            isActive ? "border border-black" : "bg-black"
          }`;

          return (
            <li key={item.label}>
              {isExternal ? (
                <a
                  href={href}
                  className={linkClass}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className={squareClass} aria-hidden />
                  <span>{item.label}</span>
                </a>
              ) : (
                <Link href={href} className={linkClass}>
                  <span className={squareClass} aria-hidden />
                  <span>{item.label}</span>
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default NavLinks;