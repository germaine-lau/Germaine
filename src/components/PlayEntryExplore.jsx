function PlayEntryExplore({
  title,
  description,
  height,
  image,
  video,
  mediaWidth = 'w-full',
  captionWidth = 'max-w-[250px]',
}) {
  return (
    <article className="flex w-full flex-col text-black">
      <div className={mediaWidth}>
        {video ? (
          <video
            src={video}
            className="block w-full h-auto object-cover"
            autoPlay
            muted
            loop
            playsInline
          />
        ) : image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-auto object-cover"
          />
        ) : (
          <div
            className="w-full shrink-0 bg-neutral-200"
            style={{ height: `${height}px` }}
            aria-hidden
          />
        )}
      </div>

      <h2
        className={`mt-[25px] font-arial text-[13px] font-bold leading-[1.35] tracking-[0px] min-[750px]:mt-[12px] min-[750px]:text-[10px] min-[750px]:leading-[1.25] ${captionWidth}`}
      >
        {title}
      </h2>

      {description && (
        <p
          className={`mt-[4px] whitespace-pre-line font-arial text-[13px] leading-[1.35] tracking-[0px] text-black min-[750px]:text-[10px] min-[750px]:leading-[1.25] ${captionWidth}`}
        >
          {description}
        </p>
      )}
    </article>
  );
}

export default PlayEntryExplore;