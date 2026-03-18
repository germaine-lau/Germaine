import ExperienceItem from './ExperienceItem';

function ExperienceSection({ title = 'Experience', items = [], className = '' }) {
  return (
    <section className={`flex flex-col gap-4 w-full ${className}`} aria-labelledby="experience-heading">
      <h2
        id="experience-heading"
        className="text-[25px] font-normal leading-[1.2] tracking-[-0.25px] text-black"
      >
        {title}
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-[auto_auto_auto] gap-y-6 lg:gap-y-0 gap-x-6 items-start">
        {items.map((item, index) => (
          <ExperienceItem
            key={index}
            title={item.title}
            subtitle={item.subtitle}
            location={item.location}
            dates={item.dates}
            award={item.award}
          />
        ))}
      </div>
    </section>
  );
}

export default ExperienceSection;
