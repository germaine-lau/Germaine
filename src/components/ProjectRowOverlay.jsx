'use client';

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { PAGE_GUTTER_LEFT } from '../lib/layout';

function ProjectRow({
  title,
  category,
  description,
  credits = '',
  mediaItems = [],
  disableCarousel = false,
  containMediaRail = false,
  className = '',
}) {
  const mobileViewportRef = useRef(null);
  const desktopViewportRef = useRef(null);

  const mobileTrackRef = useRef(null);
  const desktopTrackRef = useRef(null);

  const mobileSetRef = useRef(null);
  const desktopSetRef = useRef(null);

  const mobileSetWidthRef = useRef(0);
  const desktopSetWidthRef = useRef(0);

  const mobileOffsetRef = useRef(0);
  const desktopOffsetRef = useRef(0);

  const mobileMomentumRef = useRef({ velocity: 0, lastX: 0, lastTime: 0 });
  const desktopMomentumRef = useRef({ velocity: 0, lastX: 0, lastTime: 0 });

  const mobileRafRef = useRef(0);
  const desktopRafRef = useRef(0);

  const mobileLastTimeRef = useRef(0);
  const desktopLastTimeRef = useRef(0);

  const videoRefs = useRef({});

  const [mobileHeight, setMobileHeight] = useState(280);
  const [desktopHeight, setDesktopHeight] = useState(491);
  const [imageDimensions, setImageDimensions] = useState({});
  const [isDesktopViewport, setIsDesktopViewport] = useState(false);
  const [videoStates, setVideoStates] = useState({});
  const [isDraggingMobile, setIsDraggingMobile] = useState(false);
  const [isDraggingDesktop, setIsDraggingDesktop] = useState(false);

  const mobileSuppressClickRef = useRef(false);
  const desktopSuppressClickRef = useRef(false);

  const mobileDragState = useRef({
    isPointerDown: false,
    isDragging: false,
    pointerId: null,
    startX: 0,
    startOffset: 0,
    lastX: 0,
    lastTime: 0,
    velocity: 0,
  });

  const desktopDragState = useRef({
    isPointerDown: false,
    isDragging: false,
    pointerId: null,
    startX: 0,
    startOffset: 0,
    lastX: 0,
    lastTime: 0,
    velocity: 0,
  });

  const projectId = title
    ? `project-${title.replace(/\s+/g, '-').toLowerCase()}`
    : undefined;

  const baseItems = useMemo(
    () => (mediaItems.length ? mediaItems.filter((item) => item?.src || item?.type) : []),
    [mediaItems]
  );

  const shouldLoopInfinitely = !disableCarousel && baseItems.length > 1;

  const imageItems = useMemo(
    () => baseItems.filter((item) => item?.type === 'image' && item?.src),
    [baseItems]
  );

  const railKey = disableCarousel
    ? `static-${title}-${baseItems.length}`
    : `carousel-${title}-${baseItems.length}`;

  const normalizeOffset = (offset, setWidth) => {
    if (!shouldLoopInfinitely || setWidth <= 0) return offset;

    let normalized = offset;

    while (normalized <= -setWidth) {
      normalized += setWidth;
    }

    while (normalized > 0) {
      normalized -= setWidth;
    }

    return normalized;
  };

  const applyTrackOffset = (trackRef, offsetRef, setWidthRef, nextOffset) => {
    const track = trackRef.current;
    if (!track) return;

    const setWidth = setWidthRef.current;
    const normalized = normalizeOffset(nextOffset, setWidth);

    offsetRef.current = normalized;
    track.style.transform = `translate3d(${normalized}px, 0, 0)`;
  };

  const stopMomentum = (momentumRef) => {
    momentumRef.current.velocity = 0;
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

  const prepareMutedInlineVideo = (video) => {
    if (!video) return;
    if (video.dataset.userActivated === 'true') return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.autoplay = true;
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', 'true');
    video.setAttribute('autoplay', '');
  };

  const activateVideoWithSound = async (videoKey) => {
    const video = videoRefs.current[videoKey];
    if (!video) return;

    try {
      updateVideoState(videoKey, {
        hasInteracted: true,
        muted: false,
        paused: false,
      });

      video.currentTime = 0;
      video.muted = false;
      video.defaultMuted = false;
      video.loop = false;
      video.playsInline = true;
      video.setAttribute('playsinline', '');
      video.setAttribute('webkit-playsinline', 'true');
      video.dataset.userActivated = 'true';

      await video.play();

      updateVideoState(videoKey, {
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
    const measureRails = () => {
      if (mobileViewportRef.current) {
        setMobileHeight(mobileViewportRef.current.clientHeight || 280);
      }

      if (desktopViewportRef.current) {
        setDesktopHeight(desktopViewportRef.current.clientHeight || 491);
      }

      if (mobileSetRef.current) {
        mobileSetWidthRef.current = mobileSetRef.current.getBoundingClientRect().width || 0;
        applyTrackOffset(
          mobileTrackRef,
          mobileOffsetRef,
          mobileSetWidthRef,
          mobileOffsetRef.current
        );
      }

      if (desktopSetRef.current) {
        desktopSetWidthRef.current = desktopSetRef.current.getBoundingClientRect().width || 0;
        applyTrackOffset(
          desktopTrackRef,
          desktopOffsetRef,
          desktopSetWidthRef,
          desktopOffsetRef.current
        );
      }
    };

    const id = requestAnimationFrame(measureRails);

    window.addEventListener('resize', measureRails);

    const observers = [];

    if (typeof ResizeObserver !== 'undefined') {
      if (mobileViewportRef.current) {
        const obs = new ResizeObserver(measureRails);
        obs.observe(mobileViewportRef.current);
        observers.push(obs);
      }

      if (desktopViewportRef.current) {
        const obs = new ResizeObserver(measureRails);
        obs.observe(desktopViewportRef.current);
        observers.push(obs);
      }

      if (mobileSetRef.current) {
        const obs = new ResizeObserver(measureRails);
        obs.observe(mobileSetRef.current);
        observers.push(obs);
      }

      if (desktopSetRef.current) {
        const obs = new ResizeObserver(measureRails);
        obs.observe(desktopSetRef.current);
        observers.push(obs);
      }
    }

    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener('resize', measureRails);
      observers.forEach((obs) => obs.disconnect());
    };
  }, [baseItems.length, isDesktopViewport, imageDimensions]);

  useEffect(() => {
    Object.values(videoRefs.current).forEach((video) => {
      if (!video) return;

      const videoKey = video.dataset.videoKey;
      if (!videoKey) return;

      const hasInteracted = videoStates[videoKey]?.hasInteracted === true;
      const isPreviewVideo = video.dataset.previewVideo === 'true';

      video.autoplay = true;
      video.playsInline = true;
      video.setAttribute('playsinline', '');
      video.setAttribute('webkit-playsinline', 'true');
      video.setAttribute('autoplay', '');

      if (isPreviewVideo || !hasInteracted) {
        video.muted = true;
        video.defaultMuted = true;
      }

      if (video.paused && (isPreviewVideo || !hasInteracted)) {
        video.play().catch(() => {});
      }
    });
  }, [videoStates, isDesktopViewport, baseItems.length]);

  useEffect(() => {
    const runRail = ({
      trackRef,
      offsetRef,
      setWidthRef,
      momentumRef,
      dragState,
      rafRef,
      lastTimeRef,
    }) => {
      const friction = 0.94;
      const minVelocity = 4; // px/sec

      const animate = (time) => {
        if (!lastTimeRef.current) lastTimeRef.current = time;
        const dt = (time - lastTimeRef.current) / 1000;
        lastTimeRef.current = time;

        if (setWidthRef.current > 0 && shouldLoopInfinitely) {
          if (dragState.current.isDragging || dragState.current.isPointerDown) {
            // live drag controls position
          } else if (Math.abs(momentumRef.current.velocity) > minVelocity) {
            applyTrackOffset(
              trackRef,
              offsetRef,
              setWidthRef,
              offsetRef.current + momentumRef.current.velocity * dt
            );

            momentumRef.current.velocity *= Math.pow(friction, dt * 60);
          } else {
            momentumRef.current.velocity = 0;
          }
        }

        rafRef.current = requestAnimationFrame(animate);
      };

      rafRef.current = requestAnimationFrame(animate);
    };

    runRail({
      trackRef: mobileTrackRef,
      offsetRef: mobileOffsetRef,
      setWidthRef: mobileSetWidthRef,
      momentumRef: mobileMomentumRef,
      dragState: mobileDragState,
      rafRef: mobileRafRef,
      lastTimeRef: mobileLastTimeRef,
    });

    runRail({
      trackRef: desktopTrackRef,
      offsetRef: desktopOffsetRef,
      setWidthRef: desktopSetWidthRef,
      momentumRef: desktopMomentumRef,
      dragState: desktopDragState,
      rafRef: desktopRafRef,
      lastTimeRef: desktopLastTimeRef,
    });

    return () => {
      if (mobileRafRef.current) cancelAnimationFrame(mobileRafRef.current);
      if (desktopRafRef.current) cancelAnimationFrame(desktopRafRef.current);
      mobileLastTimeRef.current = 0;
      desktopLastTimeRef.current = 0;
    };
  }, [shouldLoopInfinitely]);

  useEffect(() => {
    return () => {
      stopMomentum(mobileMomentumRef);
      stopMomentum(desktopMomentumRef);
    };
  }, []);

  const createTrackHandlers = (
    viewportRef,
    trackRef,
    offsetRef,
    setWidthRef,
    dragState,
    momentumRef,
    setDragging,
    suppressClickRef
  ) => {
    const handlePointerDown = (e) => {
      if (!shouldLoopInfinitely) return;

      const interactiveTarget = e.target.closest(
        'button, input, [data-video-controls="true"]'
      );
      if (interactiveTarget) return;

      const viewport = viewportRef.current;
      if (!viewport) return;

      stopMomentum(momentumRef);

      dragState.current.isPointerDown = true;
      dragState.current.isDragging = false;
      dragState.current.pointerId = e.pointerId;
      dragState.current.startX = e.clientX;
      dragState.current.startOffset = offsetRef.current;
      dragState.current.lastX = e.clientX;
      dragState.current.lastTime = performance.now();
      dragState.current.velocity = 0;

      momentumRef.current.velocity = 0;
      momentumRef.current.lastX = e.clientX;
      momentumRef.current.lastTime = performance.now();

      suppressClickRef.current = false;

      viewport.setPointerCapture?.(e.pointerId);
    };

    const handlePointerMove = (e) => {
      const viewport = viewportRef.current;
      if (!viewport) return;
      if (!dragState.current.isPointerDown) return;
      if (dragState.current.pointerId !== e.pointerId) return;

      const dx = e.clientX - dragState.current.startX;

      if (!dragState.current.isDragging && Math.abs(dx) >= 6) {
        dragState.current.isDragging = true;
        setDragging(true);
        suppressClickRef.current = true;
      }

      if (!dragState.current.isDragging) return;

      e.preventDefault();

      applyTrackOffset(trackRef, offsetRef, setWidthRef, dragState.current.startOffset + dx);

      const now = performance.now();
      const dt = (now - momentumRef.current.lastTime) / 1000;

      if (dt > 0) {
        const deltaX = e.clientX - momentumRef.current.lastX;
        momentumRef.current.velocity = deltaX / dt; // px/sec
      }

      momentumRef.current.lastX = e.clientX;
      momentumRef.current.lastTime = now;

      dragState.current.lastX = e.clientX;
      dragState.current.lastTime = now;
    };

    const endDrag = (e) => {
      const viewport = viewportRef.current;
      if (!viewport) return;
      if (!dragState.current.isPointerDown) return;
      if (dragState.current.pointerId !== e.pointerId) return;

      const wasDragging = dragState.current.isDragging;

      dragState.current.isPointerDown = false;
      dragState.current.isDragging = false;
      dragState.current.pointerId = null;

      setDragging(false);
      viewport.releasePointerCapture?.(e.pointerId);

      if (wasDragging) {
        window.setTimeout(() => {
          suppressClickRef.current = false;
        }, 120);
      } else {
        window.setTimeout(() => {
          suppressClickRef.current = false;
        }, 0);
      }
    };

    const handleWheel = (e) => {
      if (!shouldLoopInfinitely) return;

      const interactiveTarget = e.target.closest(
        'input, [data-video-controls="true"]'
      );
      if (interactiveTarget) return;

      const primaryDelta =
        Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;

      if (primaryDelta === 0) return;

      e.preventDefault();

      applyTrackOffset(
        trackRef,
        offsetRef,
        setWidthRef,
        offsetRef.current - primaryDelta
      );

      momentumRef.current.velocity = primaryDelta * -22;
      momentumRef.current.lastTime = performance.now();
    };

    return {
      handlePointerDown,
      handlePointerMove,
      handlePointerUp: endDrag,
      handlePointerCancel: endDrag,
      handleWheel,
    };
  };

  const mobileHandlers = createTrackHandlers(
    mobileViewportRef,
    mobileTrackRef,
    mobileOffsetRef,
    mobileSetWidthRef,
    mobileDragState,
    mobileMomentumRef,
    setIsDraggingMobile,
    mobileSuppressClickRef
  );

  const desktopHandlers = createTrackHandlers(
    desktopViewportRef,
    desktopTrackRef,
    desktopOffsetRef,
    desktopSetWidthRef,
    desktopDragState,
    desktopMomentumRef,
    setIsDraggingDesktop,
    desktopSuppressClickRef
  );

  useEffect(() => {
    const mobileViewport = mobileViewportRef.current;
    const desktopViewport = desktopViewportRef.current;

    if (mobileViewport) {
      mobileViewport.addEventListener('wheel', mobileHandlers.handleWheel, {
        passive: false,
      });
    }

    if (desktopViewport) {
      desktopViewport.addEventListener('wheel', desktopHandlers.handleWheel, {
        passive: false,
      });
    }

    return () => {
      if (mobileViewport) {
        mobileViewport.removeEventListener('wheel', mobileHandlers.handleWheel);
      }

      if (desktopViewport) {
        desktopViewport.removeEventListener('wheel', desktopHandlers.handleWheel);
      }
    };
  }, [
    shouldLoopInfinitely,
    isDesktopViewport,
    baseItems.length,
    mobileHandlers.handleWheel,
    desktopHandlers.handleWheel,
  ]);

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

  const renderMediaItem = (item, index, prefix, carouselHeight, copyIndex = 0) => {
    const isVideo = item?.type === 'video';
    const isImage = item?.type === 'image';
    const isPreviewVideo = item?.previewMode === true;
    const isBroadStreetProject =
      typeof title === 'string' && title.toLowerCase().includes('broad street');
    const isMobileForcedPreview = !isDesktopViewport && !isBroadStreetProject;
    const shouldUsePreviewBehavior = isPreviewVideo || isMobileForcedPreview;
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

    const videoKey = `${prefix}-copy-${copyIndex}-${index}-${item?.src ?? 'video'}`;
    const hasInteracted = videoStates[videoKey]?.hasInteracted === true;
    const suppressRef =
      prefix === 'mobile' ? mobileSuppressClickRef : desktopSuppressClickRef;

    return (
      <div
        key={`${prefix}-copy-${copyIndex}-${item?.src ?? 'placeholder'}-${index}`}
        className={`flex-shrink-0 overflow-hidden text-sm text-neutral-500 ${
          item.bgClass ?? 'bg-neutral-200'
        }`}
        style={{
          height: '100%',
          width: `${itemWidth}px`,
          minWidth: `${itemWidth}px`,
        }}
      >
        {item?.src ? (
          isVideo ? (
            <div
              className="group relative h-full w-full"
              onClick={(e) => {
                e.stopPropagation();

                if (suppressRef.current) return;

                const video = videoRefs.current[videoKey];
                if (!video) return;

                if (shouldUsePreviewBehavior) {
                  prepareMutedInlineVideo(video);
                  video.play().catch(() => {});
                  return;
                }

                handleVideoPrimaryClick(videoKey);
              }}
            >
              <div className="media-item h-full w-full">
                <video
                  key={videoKey}
                  ref={(el) => {
                    if (el) {
                      videoRefs.current[videoKey] = el;
                      if (shouldUsePreviewBehavior || !hasInteracted) {
                        prepareMutedInlineVideo(el);
                      }
                    } else {
                      delete videoRefs.current[videoKey];
                    }
                  }}
                  data-video-key={videoKey}
                  data-preview-video={shouldUsePreviewBehavior ? 'true' : 'false'}
                  src={item.src}
                  aria-label={item.alt ?? ''}
                  muted={shouldUsePreviewBehavior ? true : !hasInteracted}
                  playsInline
                  autoPlay
                  loop={shouldUsePreviewBehavior ? true : !hasInteracted}
                  preload="auto"
                  controls={false}
                  disablePictureInPicture
                  disableRemotePlayback
                  className="pointer-events-none block h-full w-full object-cover"
                  onLoadedMetadata={(e) => {
                    const video = e.currentTarget;
                    video.playsInline = true;
                    video.setAttribute('playsinline', '');
                    video.setAttribute('webkit-playsinline', 'true');

                    if (shouldUsePreviewBehavior || !hasInteracted) {
                      video.muted = true;
                      video.defaultMuted = true;
                    }

                    if (shouldUsePreviewBehavior) {
                      video.play().catch(() => {});
                      return;
                    }

                    handleVideoLoadedMetadata(videoKey);

                    updateVideoState(videoKey, {
                      muted: video.muted,
                      paused: video.paused,
                      currentTime: video.currentTime || 0,
                      duration: video.duration || 0,
                    });

                    video.play().catch(() => {});
                  }}
                  onCanPlay={(e) => {
                    const video = e.currentTarget;
                    video.playsInline = true;
                    video.setAttribute('playsinline', '');
                    video.setAttribute('webkit-playsinline', 'true');

                    if (shouldUsePreviewBehavior || !hasInteracted) {
                      video.muted = true;
                      video.defaultMuted = true;
                    }

                    if (video.paused && (shouldUsePreviewBehavior || !hasInteracted)) {
                      video.play().catch(() => {});
                    }
                  }}
                  onTimeUpdate={() => {
                    if (!shouldUsePreviewBehavior) {
                      handleVideoTimeUpdate(videoKey);
                    }
                  }}
                  onPlay={() => {
                    if (!shouldUsePreviewBehavior) {
                      updateVideoState(videoKey, { paused: false });
                    }
                  }}
                  onPause={() => {
                    if (!shouldUsePreviewBehavior) {
                      updateVideoState(videoKey, { paused: true });
                    }
                  }}
                  onEnded={(e) => {
                    if (shouldUsePreviewBehavior) return;

                    const video = e.currentTarget;
                    if (!hasInteracted) {
                      video.currentTime = 0;
                      video.play().catch(() => {});
                    }
                  }}
                  onError={(e) => {
                    const video = e.currentTarget;
                    video.load();
                  }}
                />
              </div>

              {!shouldUsePreviewBehavior && (
                <>
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />

                  <div className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    <div className="absolute bottom-0 left-0 right-0 px-3 pb-2">
                      <div
                        data-video-controls="true"
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
                              <path
                                d="M16.5 9.5a4.5 4.5 0 0 1 0 5"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                              />
                              <path
                                d="M18.5 7a8 8 0 0 1 0 10"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                              />
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
            <div className={`h-full w-full ${item.innerClass ?? ''}`}>
           <img
  src={item.src}
  alt={item.alt ?? ''}
  draggable={false}
  onLoad={(e) => saveImageDimensions(item.src, e.currentTarget)}
  className={`pointer-events-none block h-full w-full ${
    item.fitClass ?? 'object-cover object-top'
  } ${item?.className ?? ''}`}
/>
          </div>
          ) : null
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span>Media {(index % (baseItems.length || 1)) + 1}</span>
          </div>
        )}
      </div>
    );
  };

  const renderTrack = (prefix, carouselHeight, setRef, trackRef) => {
    const items = baseItems;

    return (
      <div
        ref={trackRef}
        className="flex w-max items-stretch gap-[12px] will-change-transform"
        style={{ transform: 'translate3d(0px, 0, 0)' }}
      >
        <div ref={setRef} className="flex items-stretch gap-[12px]">
          {items.map((item, index) => renderMediaItem(item, index, prefix, carouselHeight, 0))}
        </div>

        {shouldLoopInfinitely && (
          <div className="flex items-stretch gap-[12px]">
            {items.map((item, index) => renderMediaItem(item, index, prefix, carouselHeight, 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <section
      className={`w-full pb-12 pt-6 min-[750px]:pb-32 min-[750px]:pt-7 min-[850px]:grid min-[850px]:grid-cols-[360px,minmax(0,1fr)] min-[850px]:items-stretch min-[850px]:gap-[64px] min-[850px]:pt-[28px] last:pb-8 min-[750px]:last:pb-0 ${className}`}
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
              ref={mobileViewportRef}
              onPointerDown={mobileHandlers.handlePointerDown}
              onPointerMove={mobileHandlers.handlePointerMove}
              onPointerUp={mobileHandlers.handlePointerUp}
              onPointerCancel={mobileHandlers.handlePointerCancel}
              className={`h-[280px] overflow-hidden min-[750px]:h-[491px] ${
                disableCarousel ? `${PAGE_GUTTER_LEFT}` : ''
              } ${shouldLoopInfinitely ? 'select-none' : ''} ${
                shouldLoopInfinitely
                  ? isDraggingMobile
                    ? 'cursor-grabbing'
                    : 'cursor-grab'
                  : ''
              }`}
              style={{
                touchAction: shouldLoopInfinitely ? 'pan-y' : 'auto',
                overscrollBehaviorX: 'contain',
              }}
            >
              {renderTrack('mobile', mobileHeight, mobileSetRef, mobileTrackRef)}
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
              ref={desktopViewportRef}
              onPointerDown={desktopHandlers.handlePointerDown}
              onPointerMove={desktopHandlers.handlePointerMove}
              onPointerUp={desktopHandlers.handlePointerUp}
              onPointerCancel={desktopHandlers.handlePointerCancel}
              className={`h-[491px] overflow-hidden ${
                shouldLoopInfinitely ? 'select-none' : ''
              } ${
                shouldLoopInfinitely
                  ? isDraggingDesktop
                    ? 'cursor-grabbing'
                    : 'cursor-grab'
                  : ''
              }`}
              style={{
                touchAction: shouldLoopInfinitely ? 'pan-y' : 'auto',
                overscrollBehaviorX: 'contain',
              }}
            >
              {renderTrack('desktop', desktopHeight, desktopSetRef, desktopTrackRef)}
            </div>
          </div>
        )}
      </div>

      <div className={`mt-7 ${PAGE_GUTTER_LEFT} min-[850px]:order-1 min-[850px]:mt-[6px]`}>
        <div className="flex flex-col gap-8 min-[850px]:h-full min-[850px]:min-h-[491px] min-[850px]:justify-start min-[850px]:pb-10">
          <div className="flex flex-col gap-3 min-[750px]:gap-[14px]">
            {title && (
              <h2
                id={projectId}
                className="max-w-[300px] font-weird-serif text-[2.5rem] italic leading-[1.02] tracking-[-0.01em] text-black min-[750px]:text-[35px]"
              >
                {title}
              </h2>
            )}

            {category && (
              <p className="font-arial font-semibold text-[11px] leading-[1.35] tracking-[.1px] text-black min-[750px]:text-[9px] min-[750px]:leading-[1.26]">
                {category}
              </p>
            )}

            {description && (
              <p className="max-w-[300px] whitespace-pre-line font-arial text-[13px] leading-[1.35] tracking-[0px] text-black min-[750px]:max-w-[240px] min-[750px]:text-[10px] min-[750px]:leading-[1.25]">
                {description}
              </p>
            )}
          </div>

          {credits && (
            <div className="mt-10 flex flex-col gap-3 min-[750px]:gap-[12px] min-[850px]:mt-auto">
              <div className="w-fit rounded-[18px] border-[1px] border-black px-[8px] py-[2.25px] font-arial text-[10px] leading-[1.2] tracking-[.1] text-black min-[750px]:text-[9px] min-[750px]:leading-[1.1]">
                Credits
              </div>

              <p
                className="max-w-[220px] whitespace-pre-wrap font-arial text-[11px] leading-[1.35] tracking-[.1px] text-black min-[750px]:max-w-[140px] min-[750px]:text-[9px] min-[750px]:leading-[1.26]"
                dangerouslySetInnerHTML={{
                  __html: Array.isArray(credits) ? credits[0] : credits,
                }}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default ProjectRow;