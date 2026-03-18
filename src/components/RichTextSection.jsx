function RichTextSection({ heading, children, className = '' }) {
  return (
    <section className={`flex flex-col gap-5 ${className}`} aria-labelledby={heading ? 'section-heading' : undefined}>
      {heading && (
        <h2
          id="section-heading"
          className="text-[25px] leading-[1.11] tracking-[-0.25px] text-black"
        >
          {heading}
        </h2>
      )}
      <div className="text-[14px] leading-[1.23] tracking-[-0.07px] text-black max-w-[619px] whitespace-pre-wrap">
        {children}
      </div>
    </section>
  );
}

export default RichTextSection;
