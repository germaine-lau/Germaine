function Logo({ className = '' }) {
  return (
    <div className={className}>
      <img
        src="/logo-animation.gif"
        alt="Germaine"
        className="mt-[5px] block h-[100px] w-auto min-[850px]:h-[80px] min-[1200px]:h-[80px]"
      />
    </div>
  );
}

export default Logo;