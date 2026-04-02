'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import ProjectRowOverlay from '@/components/ProjectRowOverlay';

export default function ProjectOverlay({ project, onClose }) {
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
<div className="flex h-full min-h-0 w-full flex-1 flex-col overflow-hidden border-t border-black bg-white">
<div className="relative min-h-0 flex-1 overflow-hidden">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close project"
          className="group absolute right-8 top-4 z-20 flex h-8 w-8 items-center justify-center transition-opacity duration-200 hover:opacity-60"
        >
          <Image
            src="/icons/close.svg"
            alt=""
            width={9}
            height={9}
            draggable={false}
         className="h-3 w-3 origin-center group-hover:scale-110 group-hover:[animation:spin-slow_1.2s_linear_infinite]"
          />
        </button>

        <div className="h-full min-h-0 w-full overflow-hidden px-0 pt-8 min-[750px]:pt-1">
          <ProjectRowOverlay
            title={project.title}
            category={project.category}
            description={project.description}
            credits={project.credits}
            mediaItems={project.mediaItems}
            containMediaRail={true}
            isModal={true}
            className="h-full"
          />
        </div>
      </div>
    </div>
  );
}