function ExperienceItem({ title, subtitle, location, dates, award, className = '' }) {
  return (
    <article
      className={`flex flex-col gap-0 text-[14px] font-normal leading-[1.25] tracking-[-0.145px] text-black ${className}`}
      aria-label={`${title} - ${subtitle}`}
    >
      <p>{title}</p>
      <p>{subtitle}</p>
      {(location || dates || award) && (
        <p className="leading-[1.25]">
          {location && <span>{location}</span>}
          {location && (award || dates) && <br />}
          {award && <span>{award}</span>}
          {award && dates && <br />}
          {dates && <span>{dates}</span>}
        </p>
      )}
    </article>
  );
}

export default ExperienceItem;
