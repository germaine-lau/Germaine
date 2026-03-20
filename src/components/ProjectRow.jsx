'use client';

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

function ProjectRow({
  title,
  category,
  description,
  credits = '',
  mediaItems = [],
  disableCarousel = false,
  className = '',
}) {
  const mobileScrollRef = useRef(null);
  const desktopScrollRef = useRef(null);
  const videoRefs = useRef({});

  const [mobileHeight, setMobileHeight] = useState(280);
  const [desktopHeight, setDesktopHeight] = useState(491);
  const [imageDimensions, setImageDimensions] = useState({});
  const [videoActivated, setVideoActivated] = useState({});
  const [isDesktopViewport, setIsDesktopViewport] = useState(false);
  const [videoStates, setVideoStates] = useState({});

  const mobileDragState = useRef({
    isDown: false,
    startX: 0,
    scrollLeft: 0,
  });

  const desktopDragState = useRef({
    isDown: false,
    startX: 0,
    scrollLeft: 0,
  });

  const pageGutter = 'pl-8 min-[750px]:pl-[40px]';

  const baseItems = useMemo(
    () => (mediaItems.length ? mediaItems.filter((item) => item?.src || item?.type) : []),
    [mediaItems]
  );

  const hasVideoItems = useMemo(
    () => baseItems.some((item) => item?.type === 'video'),
    [baseItems]
  );

  const shouldLoopInfinitely = !disableCarousel && baseItems.length > 1;

  const loopedItems = useMemo(() => {
    return shouldLoopInfinitely
      ? [...baseItems, ...baseItems, ...baseItems]
      : baseItems;
  }, [baseItems, shouldLoopInfinitely]);

  const imageItems = useMemo(
    () => baseItems.filter((item) => item?.type === 'image' && item?.src),
    [baseItems]
  );

  const allImageSizesReady = imageItems.every(
    (item) => imageDimensions[item.src]
  );

  const projectId = title
    ? `project-${title.replace(/\s+/g, '-').toLowerCase()}`
    : undefined;

    const railKey = disableCarousel
    ? `static-${title}-${baseItems.length}`
    : `carousel-${title}-${baseItems.length}`;

    const setupInfiniteScroll = (scrollRef) => {
      if (!shouldLoopInfinitely) return;
    
      const slider = scrollRef.current;
      if (!slider) return;
    
      const children = Array.from(slider.children);
      const setLength = baseItems.length;
    
      if (!children.length || !setLength) return;
    
      const firstItem = children[0];
      const firstItemOfMiddleSet = children[setLength];
    
      if (!firstItem || !firstItemOfMiddleSet) return;
    
      slider.scrollLeft = Math.round(
        firstItemOfMiddleSet.offsetLeft - firstItem.offsetLeft
      );
    };

    const maintainInfiniteScroll = (scrollRef) => {
      if (!shouldLoopInfinitely) return;
    
      const slider = scrollRef.current;
      if (!slider) return;
    
      const children = Array.from(slider.children);
      const setLength = baseItems.length;
    
      if (!children.length || !setLength) return;
    
      const firstItem = children[0];
      const firstItemOfMiddleSet = children[setLength];
      const firstItemOfThirdSet = children[setLength * 2];
    
      if (!firstItem || !firstItemOfMiddleSet || !firstItemOfThirdSet) return;
    
      const setWidth =
        firstItemOfThirdSet.offsetLeft - firstItemOfMiddleSet.offsetLeft;
    
      const normalizedStart =
        firstItemOfMiddleSet.offsetLeft - firstItem.offsetLeft;
    
      const normalizedEnd =
        firstItemOfThirdSet.offsetLeft - firstItem.offsetLeft;
    
      const buffer = Math.max(80, Math.round(slider.clientWidth * 0.2));
    
      if (slider.scrollLeft <= normalizedStart - buffer) {
        slider.scrollLeft += setWidth;
      } else if (slider.scrollLeft >= normalizedEnd - buffer) {
        slider.scrollLeft -= setWidth;
      }
    };

  const updateVideoState = (id, updates) => {
    setVideoStates((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        ...updates,
      },
    }));
  };

  const handleVideoLoadedMetadata = (id) => {
    const video = videoRefs.current[id];
    if (!video) return;

    updateVideoState(id, {
      duration: video.duration || 0,
      currentTime: video.currentTime || 0,
      muted: video.muted,
      paused: video.paused,
    });
  };

  const handleVideoTimeUpdate = (id) => {
    const video = videoRefs.current[id];
    if (!video) return;

    updateVideoState(id, {
      currentTime: video.currentTime || 0,
      duration: video.duration || 0,
      paused: video.paused,
      muted: video.muted,
    });
  };

  const togglePlayPause = async (id) => {
    const video = videoRefs.current[id];
    if (!video) return;

    try {
      if (video.paused) {
        await video.play();
        updateVideoState(id, { paused: false });
      } else {
        video.pause();
        updateVideoState(id, { paused: true });
      }
    } catch (error) {
      console.error('Video play/pause error:', error);
    }
  };

  const toggleMute = (id) => {
    const video = videoRefs.current[id];
    if (!video) return;

    video.muted = !video.muted;
    updateVideoState(id, { muted: video.muted });
  };

  const handleScrub = (id, value) => {
    const video = videoRefs.current[id];
    if (!video) return;

    const time = Number(value);
    video.currentTime = time;

    updateVideoState(id, {
      currentTime: time,
      duration: video.duration || 0,
    });
  };

  const toggleFullscreen = async (id) => {
    const video = videoRefs.current[id];
    if (!video) return;

    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await video.requestFullscreen();
      }
    } catch (error) {
      console.error('Fullscreen error:', error);
    }
  };

  const formatTime = (time) => {
    if (!Number.isFinite(time)) return '0:00';

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${String(seconds).padStart(2, '0')}`;
  };

  const activateVideoWithSound = async (videoKey) => {
    const video = videoRefs.current[videoKey];
    if (!video) return;

    try {
      video.currentTime = 0;
      video.muted = false;
      video.loop = false;

      await video.play();

      setVideoActivated((prev) => ({
        ...prev,
        [videoKey]: true,
      }));

      updateVideoState(videoKey, {
        hasInteracted: true,
        muted: false,
        paused: false,
        currentTime: video.currentTime || 0,
        duration: video.duration || 0,
      });
    } catch (error) {
      console.error('Video activation failed:', error);
    }
  };

  const handleVideoPrimaryClick = async (videoKey) => {
    const hasInteracted = videoStates[videoKey]?.hasInteracted;

    if (!hasInteracted) {
      await activateVideoWithSound(videoKey);
    } else {
      await togglePlayPause(videoKey);
    }
  };

  useEffect(() => {
    imageItems.forEach((item) => {
      if (imageDimensions[item.src]) return;

      const img = new window.Image();
      img.src = item.src;

      const saveDimensions = () => {
        if (!img.naturalWidth || !img.naturalHeight) return;

        setImageDimensions((prev) => ({
          ...prev,
          [item.src]: {
            width: img.naturalWidth,
            height: img.naturalHeight,
          },
        }));
      };

      if (img.complete) {
        saveDimensions();
      } else {
        img.onload = saveDimensions;
      }
    });
  }, [imageItems, imageDimensions]);

  useEffect(() => {
    const checkViewport = () => {
      setIsDesktopViewport(window.innerWidth >= 850);
    };

    checkViewport();
    window.addEventListener('resize', checkViewport);

    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  useLayoutEffect(() => {
    if (disableCarousel) {
      if (mobileScrollRef.current) {
        mobileScrollRef.current.scrollLeft = 0;
      }

      if (desktopScrollRef.current) {
        desktopScrollRef.current.scrollLeft = 0;
      }

      return;
    }

    const id = requestAnimationFrame(() => {
      if (!isDesktopViewport) {
        setupInfiniteScroll(mobileScrollRef);
        return;
      }

      if (allImageSizesReady || hasVideoItems) {
        setupInfiniteScroll(desktopScrollRef);
      }
    });

    return () => cancelAnimationFrame(id);
  }, [
    disableCarousel,
    isDesktopViewport,
    baseItems.length,
    mobileHeight,
    desktopHeight,
    allImageSizesReady,
    hasVideoItems,
  ]);

  useEffect(() => {
    const updateHeights = () => {
      if (mobileScrollRef.current) {
        setMobileHeight(mobileScrollRef.current.clientHeight || 280);
      }

      if (desktopScrollRef.current) {
        setDesktopHeight(desktopScrollRef.current.clientHeight || 491);
      }
    };

    updateHeights();

    window.addEventListener('resize', updateHeights);

    const mobileObserver =
      typeof ResizeObserver !== 'undefined' && mobileScrollRef.current
        ? new ResizeObserver(updateHeights)
        : null;

    const desktopObserver =
      typeof ResizeObserver !== 'undefined' && desktopScrollRef.current
        ? new ResizeObserver(updateHeights)
        : null;

    if (mobileObserver && mobileScrollRef.current) {
      mobileObserver.observe(mobileScrollRef.current);
    }

    if (desktopObserver && desktopScrollRef.current) {
      desktopObserver.observe(desktopScrollRef.current);
    }

    return () => {
      window.removeEventListener('resize', updateHeights);
      mobileObserver?.disconnect();
      desktopObserver?.disconnect();
    };
  }, [isDesktopViewport]);

  const createMouseHandlers = (scrollRef, dragState) => ({
    handleMouseDown: (e) => {
      if (!shouldLoopInfinitely) return;

      const interactiveTarget = e.target.closest(
        'button, input, video, [data-no-drag="true"]'
      );

      if (interactiveTarget) return;

      const slider = scrollRef.current;
      if (!slider) return;

      dragState.current.isDown = true;
      dragState.current.startX = e.pageX;
      dragState.current.scrollLeft = slider.scrollLeft;
    },

    handleMouseMove: (e) => {
      if (!shouldLoopInfinitely) return;

      const slider = scrollRef.current;
      if (!slider || !dragState.current.isDown) return;

      e.preventDefault();
      const x = e.pageX;
      const walk = (x - dragState.current.startX) * 1.8;
      slider.scrollLeft = dragState.current.scrollLeft - walk;

      maintainInfiniteScroll(scrollRef);
    },

    handleMouseUp: () => {
      dragState.current.isDown = false;
    },
  });

  const mobileHandlers = createMouseHandlers(mobileScrollRef, mobileDragState);
  const desktopHandlers = createMouseHandlers(
    desktopScrollRef,
    desktopDragState
  );

  const saveImageDimensions = (src, img) => {
    if (!src || !img?.naturalWidth || !img?.naturalHeight) return;

    setImageDimensions((prev) => {
      if (
        prev[src] &&
        prev[src].width === img.naturalWidth &&
        prev[src].height === img.naturalHeight
      ) {
        return prev;
      }

      return {
        ...prev,
        [src]: {
          width: img.naturalWidth,
          height: img.naturalHeight,
        },
      };
    });
  };

  const renderMediaItem = (item, index, prefix, carouselHeight) => {
    const isVideo = item?.type === 'video';
    const isImage = item?.type === 'image';
    const isPreviewVideo = item?.previewMode === true;
  
    const hideBelowDesktop = item?.hideBelowDesktop === true;
  
    if (hideBelowDesktop && !isDesktopViewport) {
      return null;
    }
  
    let itemWidth = item?.width ?? 320;

    if (isImage && item?.src && imageDimensions[item.src]) {
      const { width, height } = imageDimensions[item.src];
      const ratio = width / height;
      itemWidth = carouselHeight * ratio;
    }

    if (isVideo) {
      const aspectRatio = item?.aspectRatio ?? '16 / 9';
      const [w, h] = aspectRatio.split('/').map((v) => Number(v.trim()));
      if (w && h) {
        itemWidth = carouselHeight * (w / h);
      }
    }

    const videoKey = `${item?.src ?? 'video'}-${prefix}-${index}`;
    const hasInteracted = videoStates[videoKey]?.hasInteracted === true;
    const isMuted = hasInteracted
      ? videoStates[videoKey]?.muted ?? false
      : true;

    return (
      <div
        key={`${prefix}-${item?.src ?? 'placeholder'}-${index}`}
        className="flex-shrink-0 overflow-hidden bg-neutral-200 text-sm text-neutral-500"
        style={{
          height: '100%',
          width: `${itemWidth}px`,
          minWidth: `${itemWidth}px`,
        }}
      >
        {item?.src ? (
          isVideo ? (
            <div
              className="group relative h-full w-full bg-black"
              data-no-drag="true"
              onClick={() => {
                if (!isPreviewVideo) {
                  handleVideoPrimaryClick(videoKey);
                }
              }}
            >
              <video
                key={videoKey}
                ref={(el) => {
                  if (el) videoRefs.current[videoKey] = el;
                }}
                src={item.src}
                aria-label={item.alt ?? ''}
                muted={isPreviewVideo ? true : isMuted}
                playsInline
                autoPlay
                loop={isPreviewVideo ? true : !hasInteracted}
                preload="metadata"
                controls={false}
                className={`${
                  isPreviewVideo ? 'pointer-events-none ' : ''
                }block h-full w-full object-cover`}
                onLoadedMetadata={(e) => {
                  if (isPreviewVideo) {
                    e.currentTarget.muted = true;
                    e.currentTarget.play().catch(() => {});
                    return;
                  }

                  handleVideoLoadedMetadata(videoKey);

                  const video = e.currentTarget;
                  video.muted = true;

                  updateVideoState(videoKey, {
                    muted: true,
                    paused: video.paused,
                    currentTime: video.currentTime || 0,
                    duration: video.duration || 0,
                  });

                  video.play().catch(() => {});
                }}
                onTimeUpdate={() => {
                  if (!isPreviewVideo) {
                    handleVideoTimeUpdate(videoKey);
                  }
                }}
                onPlay={() => {
                  if (!isPreviewVideo) {
                    updateVideoState(videoKey, { paused: false });
                  }
                }}
                onPause={() => {
                  if (!isPreviewVideo) {
                    updateVideoState(videoKey, { paused: true });
                  }
                }}
              />

              {!isPreviewVideo && (
                <>
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />

                  <div className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    <div className="absolute bottom-0 left-0 right-0 px-3 pb-2">
                      <div
                        className="pointer-events-auto flex items-center gap-3 text-white"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          type="button"
                          onClick={() => handleVideoPrimaryClick(videoKey)}
                          className="flex h-6 w-6 items-center justify-center text-white transition-opacity hover:opacity-70"
                          aria-label={
                            videoStates[videoKey]?.paused === false
                              ? 'Pause video'
                              : 'Play video'
                          }
                        >
                          {videoStates[videoKey]?.paused === false ? (
                            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                              <rect x="6" y="5" width="4" height="14" />
                              <rect x="14" y="5" width="4" height="14" />
                            </svg>
                          ) : (
                            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                              <polygon points="8,5 19,12 8,19" />
                            </svg>
                          )}
                        </button>

                        <span className="min-w-[72px] text-[11px] leading-none text-white">
                          {formatTime(videoStates[videoKey]?.currentTime || 0)} /{' '}
                          {formatTime(videoStates[videoKey]?.duration || 0)}
                        </span>

                        <input
                          type="range"
                          min="0"
                          max={videoStates[videoKey]?.duration || 0}
                          step="0.1"
                          value={videoStates[videoKey]?.currentTime || 0}
                          onChange={(e) => handleScrub(videoKey, e.target.value)}
                          onMouseDown={(e) => e.stopPropagation()}
                          className="video-slider h-[3px] w-full cursor-pointer"
                          aria-label="Video progress"
                        />

                        <button
                          type="button"
                          onClick={() => toggleMute(videoKey)}
                          className="flex h-6 w-6 items-center justify-center text-white transition-opacity hover:opacity-70"
                          aria-label={
                            videoStates[videoKey]?.muted
                              ? 'Turn sound on'
                              : 'Turn sound off'
                          }
                        >
                          {videoStates[videoKey]?.muted ? (
                            <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true" fill="none">
                              <path d="M14 5.23v13.54L7.5 14H4V10h3.5L14 5.23z" fill="currentColor" />
                              <path d="M16 9l5 5" stroke="currentColor" strokeWidth="2" />
                              <path d="M21 9l-5 5" stroke="currentColor" strokeWidth="2" />
                            </svg>
                          ) : (
                            <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true" fill="none">
                              <path d="M14 5.23v13.54L7.5 14H4V10h3.5L14 5.23z" fill="currentColor" />
                              <path d="M16.5 9.5a4.5 4.5 0 0 1 0 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                              <path d="M18.5 7a8 8 0 0 1 0 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={() => toggleFullscreen(videoKey)}
                          className="flex h-6 w-6 items-center justify-center text-white transition-opacity hover:opacity-70"
                          aria-label="Toggle fullscreen"
                        >
                          <svg
                            viewBox="0 0 24 24"
                            className="h-4 w-4"
                            aria-hidden="true"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M8 3H3v5" />
                            <path d="M16 3h5v5" />
                            <path d="M21 16v5h-5" />
                            <path d="M8 21H3v-5" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : isImage ? (
            <img
            src={item.src}
            alt={item.alt ?? ''}
            draggable={false}
            onLoad={(e) => saveImageDimensions(item.src, e.currentTarget)}
            className={`pointer-events-none block h-full w-full object-cover ${item?.className ?? ''}`}
          />
          ) : null
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span>Media {(index % (baseItems.length || 1)) + 1}</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <section
      className={`w-full pb-12 pt-6 min-[750px]:pb-28 min-[750px]:pt-7 min-[850px]:grid min-[850px]:grid-cols-[360px,minmax(0,1fr)] min-[850px]:items-stretch min-[850px]:gap-[64px] min-[850px]:pt-[28px] last:pb-8 min-[750px]:last:pb-0 ${className}`}
      aria-labelledby={projectId}
    >
      <div className="min-w-0 min-[850px]:order-2">
        {!isDesktopViewport ? (
          <div
            className={
              disableCarousel
                ? 'w-full overflow-hidden'
                : 'relative left-1/2 right-1/2 ml-[-50vw] mr-[-50vw] w-screen'
            }
          >
           <div
  key={`${railKey}-mobile`}
  ref={mobileScrollRef}
  onMouseDown={mobileHandlers.handleMouseDown}
  onMouseLeave={mobileHandlers.handleMouseUp}
  onMouseUp={mobileHandlers.handleMouseUp}
  onMouseMove={mobileHandlers.handleMouseMove}
  onScroll={shouldLoopInfinitely ? () => maintainInfiniteScroll(mobileScrollRef) : undefined}
  className={`flex h-[280px] justify-start items-stretch gap-[12px] overflow-y-hidden min-[750px]:h-[491px] ${
    disableCarousel
      ? `${pageGutter} overflow-x-hidden`
      : 'overflow-x-auto'
  } ${shouldLoopInfinitely ? 'scrollbar-hide select-none' : ''}`}
  style={{
    WebkitOverflowScrolling: 'touch',
    overscrollBehaviorX: disableCarousel ? 'none' : 'contain',
    cursor: shouldLoopInfinitely
      ? "url('/smiley-hover.svg') 16 16, auto"
      : 'auto',
  }}
>
              {loopedItems.map((item, index) =>
                renderMediaItem(item, index, 'mobile', mobileHeight)
              )}
            </div>
          </div>
        ) : (
          <div
            className={
              disableCarousel
                ? 'w-full overflow-hidden'
                : 'mr-[calc(50%-50vw)] w-[calc(100%+50vw-50%)] max-w-none'
            }
          >
            <div
              key={`${railKey}-desktop`}
              ref={desktopScrollRef}
              onMouseDown={desktopHandlers.handleMouseDown}
              onMouseLeave={desktopHandlers.handleMouseUp}
              onMouseUp={desktopHandlers.handleMouseUp}
              onMouseMove={desktopHandlers.handleMouseMove}
              onScroll={shouldLoopInfinitely ? () => maintainInfiniteScroll(desktopScrollRef) : undefined}
              className={`flex h-[491px] justify-start items-stretch gap-[12px] overflow-y-hidden ${
                disableCarousel ? 'overflow-x-hidden' : 'overflow-x-auto'
              } ${shouldLoopInfinitely ? 'scrollbar-hide select-none' : ''}`}
              style={{
                WebkitOverflowScrolling: 'touch',
                overscrollBehaviorX: disableCarousel ? 'none' : 'contain',
                cursor: shouldLoopInfinitely
                  ? "url('/smiley-hover.svg') 16 16, auto"
                  : 'auto',
              }}
            >
              {loopedItems.map((item, index) =>
                renderMediaItem(item, index, 'desktop', desktopHeight)
              )}
            </div>
          </div>
        )}
      </div>

      <div
        className={`mt-7 ${pageGutter} min-[850px]:order-1 min-[850px]:mt-[6px]`}
      >
        <div className="flex flex-col gap-8 min-[850px]:h-full min-[850px]:min-h-[491px] min-[850px]:justify-between">
          <div className="flex flex-col gap-3 min-[750px]:gap-[14px]">
            {title && (
              <h2
                id={projectId}
                className="max-w-[300px] font-weird-serif text-[2.5rem] italic leading-[1.02] tracking-[-0.01em] text-black min-[750px]:text-[40px]"
              >
                {title}
              </h2>
            )}

            {category && (
            <p className="font-arial font-semibold text-[11px] leading-[1.35] min-[750px]:text-[9px] min-[750px]:leading-[1.26] tracking-[.1px] text-black">
            {category}
          </p>
            )}

            {description && (
              <p className="max-w-[300px] min-[750px]:max-w-[240px] whitespace-pre-line font-arial text-[13px] leading-[1.35] min-[750px]:text-[10px] min-[750px]:leading-[1.25] tracking-[0px] text-black">
                {description}
              </p>
            )}
          </div>

          {credits && (
            <div className="flex flex-col gap-3 min-[750px]:gap-[12px] min-[850px]:mt-8">
            <div className="w-fit rounded-[18px] border-[1px] border-black px-[8px] py-[2.25px] font-arial text-[10px] leading-[1.2] min-[750px]:text-[9px] min-[750px]:leading-[1.1] tracking-[.1] text-black">
  Credits
</div>
          
              <p className="max-w-[220px] min-[750px]:max-w-[140px] whitespace-pre-wrap font-arial text-[11px] leading-[1.35] min-[750px]:text-[9px] min-[750px]:leading-[1.26] tracking-[.1px] text-black">
                {credits}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default ProjectRow;