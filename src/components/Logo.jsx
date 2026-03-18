import Link from 'next/link';

function Logo({ className = '' }) {
  return (
    <div className={className}>
      <Link href="/" className="inline-block">
        <img
          src="/logo-animation.gif"
          alt="Germaine"
          className="block h-[100px] min-[850px]:h-[80px] min-[1200px]:h-[80px] w-auto mt-[5px]"
        />
      </Link>
    </div>
  );
}

export default Logo;