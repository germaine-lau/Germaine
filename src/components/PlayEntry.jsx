function PlayEntry({ title, description, height, image, video }) {
  return (
    <article className="flex w-full flex-col text-black">
      {video ? (
        <video
          src={video}
          className="w-full h-auto object-cover"
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

      <h2 className="mt-[25px] font-arial text-[13px] font-bold leading-[1.35] tracking-[0px] min-[750px]:mt-[12px] min-[750px]:text-[10px] min-[750px]:leading-[1.25]">
        {title}
      </h2>

      {description && (
        <p className="mt-[4px] max-w-[250px] whitespace-pre-line font-arial text-[13px] leading-[1.35] tracking-[0px] text-black min-[750px]:max-w-[240px] min-[750px]:text-[10px] min-[750px]:leading-[1.25]">
          {description}
        </p>
      )}
    </article>
  );
}

export default PlayEntry;