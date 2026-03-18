function Content({ children, className = '' }) {
  return (
    <main
      className={`flex flex-col gap-11 items-start w-full text-black ${className}`}
      id="main-content"
    >
      {children}
    </main>
  );
}

export default Content;
