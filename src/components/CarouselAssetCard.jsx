'use client';

import { useRef } from 'react';

function ProjectMedia({
  project,
  altOverride = null,
  clickToToggleVideo = false,
}) {
  const videoRef = useRef(null);

  const handleVideoClick = () => {
    if (!clickToToggleVideo || project.type !== 'video') return;

    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  return (
    <div
      className={`${project.heightClass} relative overflow-hidden bg-neutral-200 transition-opacity duration-200 ease-out group-hover:opacity-80`}
    >
      <div className={`h-full w-full ${project.innerClass ?? ''}`}>
        {project.type === 'video' ? (
          <video
            ref={videoRef}
            src={project.src}
            className={`block h-full w-full select-none ${
              project.fitClass ?? 'object-cover'
            } ${project.objectPositionClass ?? 'object-center'} ${
              clickToToggleVideo ? 'cursor-pointer' : 'pointer-events-none'
            }`}
            autoPlay
            muted
            loop
            playsInline
            draggable={false}
            onClick={handleVideoClick}
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        ) : (
          <img
            src={project.src}
            alt={altOverride ?? project.title}
            className={`pointer-events-none block h-full w-full select-none ${
              project.fitClass ?? 'object-cover'
            } ${project.objectPositionClass ?? 'object-center'}`}
            draggable={false}
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        )}
      </div>
    </div>
  );
}

export function CarouselAssetCard({
  project,
  onOpen,
  suppressClickRef,
  interactive = true,
  clickToToggleVideo = false,
}) {
  return (
    <article
      className={`group relative shrink-0 self-end ${project.widthClass}`}
    >
      <ProjectMedia
        project={project}
        altOverride={interactive ? null : ''}
        clickToToggleVideo={clickToToggleVideo}
      />

      {interactive ? (
        <button
          type="button"
          aria-label={`Open ${project.title}`}
          className="absolute inset-0 z-10 cursor-pointer border-0 bg-transparent p-0"
          onClick={(e) => {
            e.stopPropagation();
            if (suppressClickRef?.current) return;
            onOpen?.(project);
          }}
        />
      ) : null}
    </article>
  );
}

export { ProjectMedia };