'use client';

import { useEffect, useRef, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProjectOverlay from '@/components/ProjectOverlay';
import { CarouselAssetCard } from '@/components/CarouselAssetCard';
import { PAGE_GUTTER } from '@/lib/layout';

const DEFAULT_NAV_ITEMS = [
  { label: 'about', href: '/about' },
  { label: 'contact', href: 'mailto:hello@germainelau.com' },
  { label: 'linkedin', href: 'https://www.linkedin.com/in/germaine-lau/' },
];

const TEST_PROJECTS = [
  {
    id: 'bre 2026',
    title: '857-POS-PROS',
    category: 'Experiential / Print',
    description: `Most POS marketing blend together with soft promises and generic claims. At the Bar and Restaurant Expo, we took a more direct approach. Using the blunt clarity (and slight absurdity) of lawyer ads, we called out real operator pain points with a clear directive: Call Square.

I led a rethinking of the booth collateral, breaking from typical POS conventions to create materials that made product features and seller stories engaging. The result was a system that made Square’s value immediate. No soft language, no burying the point.`,
    credits: [
      `Creative Direction
Sean Conroy, Christian Wildic

Design
Germaine Lau, Emanual Ilagan, John Bermingham

Copy
Michael Grover`,
    ],
    type: 'image',
    src: '/images/Brochure_Front.png',
    fitClass: 'object-cover object-bottom',
    heightClass: 'h-[34vh] min-h-[380px] min-[750px]:h-[40vh]',
    widthClass:
      'w-[100vw] min-[600px]:w-[72vw] min-[850px]:w-[42vw] min-[1200px]:w-[32vw]',
    mediaItems: [
      { type: 'image', src: '/images/PosPros_Cover_LowRes.png' },
      { type: 'image', src: '/images/Spread_Lotus_2.png' },
      { type: 'image', src: '/images/Spread_Grid.png' },
      { type: 'image', src: '/images/Spread_Ggiata.png' },
      { type: 'image', src: '/images/Zine_Animation.gif' },
      { type: 'image', src: '/images/Booth_01.png' },
      { type: 'image', src: '/images/Booth_02.png' },
      { type: 'image', src: '/images/Brochure_Front.png' },
      { type: 'image', src: '/images/Brochure_04.png' },
      { type: 'image', src: '/images/PosPros_Billboard.png' },
    ],
    modal: {},
  },

  {
    id: 'katzs',
    
    title: "Katz's x Square",
    category: 'Experiential / Print',
    description: `Katz’s isn’t just known for its sandwiches. It’s a neighborhood icon. I developed the winning “Time” concept, using Katz’s legacy as a lens to connect Square to the neighborhood—pairing tradition with modernity in a way that reflects both brands.

The campaign nods to the things that will always change at Katz’s while celebrating the things that never will, and it positions Square as part of that ongoing story. Spanning the Lower East Side to Delancey Station and Times Square, the work brought a neighborhood icon into a citywide presence.`,
    credits: [
      `Creative Direction
Sean Conroy

Design
Germaine Lau, Brandon Murray, Northy Chen

Copy
Jonathan Skale

Production
Jennifer Bonilla, Terumi Fletcher`,
    ],
    type: 'video',
    src: '/videos/katz_vertical_thumbnail.mp4',
    fitClass: 'object-cover object-[50%_20%]',
    heightClass: 'h-[46vh] min-h-[500px] min-[750px]:h-[62vh]',
    widthClass:
      'w-[78vw] min-[600px]:w-[58vw] min-[850px]:w-[36vw] min-[1200px]:w-[28vw]',
    mediaItems: [
      {
        type: 'video',
        src: '/videos/CP_Square_Katz_HERO_V3_260207_FINAL_CC_MIX_CAPTIONS.mp4',
        aspectRatio: '16 / 9',
        loop: true,
      },
      { type: 'image', src: '/images/TimesChange_01.png' },
      { type: 'image', src: '/images/000001440034.jpg' },
      { type: 'image', src: '/images/Faregates.png' },
      { type: 'image', src: '/images/000001440019.jpg' },
      { type: 'image', src: '/images/TimesChange_03.png' },
      { type: 'image', src: '/images/000001440025.jpg' },
      { type: 'image', src: '/images/TimesChange_02.png' },
      { type: 'image', src: '/images/000001450017.jpg' },
    ],
    modal: {},
  },

  {
    id: 'syitn 2025',
    title: 'See you in the neighborhood',
    category: 'Art Direction',
    description: `Square’s See You in the Neighborhood campaign introduced a refreshed brand identity and tagline through a national rollout spanning 300+ OOH assets across eight major cities.

I led the design and animation of all digital and high-impact print across the campaign. The system was localized to each city, highlighting real businesses to position Square as a fixture in the neighborhood.`,
    credits: [`Creative Direction
Sean Conroy, Said Fayad

Design
Germaine Lau, Brandon Murray

Copy
Jonathan Skale

Production
Chris Mah, Stefania Mercante, Jennifer Bonilla, Terumi Fletcher`],
    type: 'image',
    src: '/images/SYITN_10.png',
  fitClass: 'object-cover',
  heightClass: 'h-[33vh] min-h-[250px] min-[750px]:h-[38vh] min-[850px]:h-[42vh]',
  widthClass:
    'w-[68vw] min-[600px]:w-[62vw] min-[750px]:w-[48vw] min-[850px]:w-[34vw] min-[1200px]:w-[26vw]',
    mediaItems: [
      { type: 'image', src: '/images/SYITN_10.png' },
      {
        type: 'video',
        src: '/videos/SYITN_TY.mp4',
        aspectRatio: '160 / 107',
        previewMode: true,
        loop: true,
      },
      { type: 'image', src: '/images/Wildpostings_01.jpeg' },
      { type: 'image', src: '/images/Wildpostings_02.png' },
      { type: 'image', src: '/images/1846340.png' },
    ],
    modal: {},
  },

  {
    id: 'vegas 2025',
    title: 'Big in Restaurants',
    category: 'Concept / Art Direction',
    description: `Square launched one of its largest OOH activations in Las Vegas. With 400+ placements, the campaign cut through the city’s visual noise while reinforcing Square’s role in restaurants.

I developed the “Restaurant Essentials” concept for key placements at Caesars Palace and Resorts World—pairing everyday objects like kitchen tape and deli containers with Square hardware to position it as a true restaurant essential. The work featured real restaurant operators and product UI, grounding it in real restaurant experiences.`,
    credits: [`Creative Direction
Monina Velarde, Dave Brown, Sean Conroy, Shawna Wagman
      
Design
Germaine Lau, Grace Heitmann 
      
Motion
Steven Dupre, Chris Mah
      
Copy
Brett Baker, Jenn Young`],
    type: 'image',
    src: '/images/Vegas_01.png',
    fitClass: 'object-cover',
    heightClass: 'h-[42vh] min-h-[380px] min-[750px]:h-[50vh] min-[850px]:h-[58vh]',
    widthClass:
      'w-[74vw] min-[600px]:w-[66vw] min-[750px]:w-[48vw] min-[850px]:w-[40vw] min-[1200px]:w-[27vw]',
    mediaItems: [
      {
        type: 'video',
        src: '/videos/Vegas_Smaller.mp4',
        previewMode: true,
        loop: true,
      },
      { type: 'image', src: '/images/Vegas_01.png' },
      { type: 'image', src: '/images/Vegas_02.png' },
    ],
    modal: {},
  },

  {
    id: 'diversity',
    title: 'US Art Museum Diversity',
    category: 'Infographic Concept, Design',
    description: `Who and what we see (and don’t see) shapes how we understand the world. Using data from major U.S. museum studies, this infographic maps representation across workforces, artists, and audiences—making it easier to see where we stand today, and where we can go next.
    
    Future iterations could expand this lens through more intersectional data across class, gender identity, and sexual orientation.`,
    credits: [`<a href="https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0212852" target="_blank">2019 Chad Topaz Study → </a> 
2022 Census and workplace demographics, and various museum studies`],
type: 'image',
src: '/images/diversity_01.png',
fitClass: 'object-cover object-top',
    heightClass: 'h-[23vh] min-h-[150px] min-[750px]:h-[28vh]',
    widthClass: 'w-[82vw] min-[600px]:w-[68vw] min-[650px]:w-[48vw] min-[1200px]:w-[30vw]',
    mediaItems: [
      {
        type: 'video',
        src: '/videos/PlayTest_08.mp4',
        aspectRatio: '267 / 200',
        previewMode: true,
        loop: true,
      },
      { type: 'image', src: '/images/diversity_5.png' },
      {
        type: 'image',
        src: '/images/diversity_8.png',
        innerClass: 'p-[1px]',
        bgClass: 'bg-white',
      },
      {
        type: 'image',
        src: '/images/diversity_9.png',
        fitClass: 'object-contain',
        innerClass: 'p-[1px]',
        bgClass: 'bg-white',
      },
      {
        type: 'image',
        src: '/images/diversity_7.png',
        fitClass: 'object-contain',
        innerClass: 'p-[1px]',
        bgClass: 'bg-white',
      },
      {
        type: 'video',
        src: '/videos/PlayTest_09.mp4',
        aspectRatio: '267 / 200',
        previewMode: true,
        loop: true,
      },
    ],
    modal: {},
  },

  {
    id: 'internet',
    title: 'The Internet',
    category: 'Web / Interactive Design',
    description: `A selection of digital and interactive work spanning social content and web design. This includes talent-led series like Running a Restaurant is No Joke with Eric Wareheim and Only the Good Stuff with Kelis.

    Additional work available upon request.`,
    credits: [`Creative Direction
Dave Brown, Monina Velarde, Jess Williams
            
Design
Germaine Lau

Copy
Jenn Young, Mike Grover`],
type: 'image',
src: '/images/Internet_01.png',
fitClass: 'object-cover object-top',
heightClass: 'h-[24vh] min-h-[280px] min-[750px]:h-[42vh] min-[850px]:h-[50vh]',
widthClass:
  'w-[64vw] min-[600px]:w-[50vw] min-[850px]:w-[28vw] min-[1200px]:w-[20vw]',
    mediaItems: [
      { type: 'image', src: '/images/Eric_02.png' },
      { type: 'image', src: '/images/Social_Woon01.png' },
      { type: 'image', src: '/images/Social_Kiosk.png' },
      { type: 'image', src: '/images/Social_Woon02.png' },
      { type: 'image', src: '/images/Eric_03.png' },
      { type: 'image', src: '/images/Social_TheSportsBra.png' },
      {
        type: 'video',
        src: '/videos/Kelis_Smaller.mp4',
        previewMode: true,
        loop: true,
        aspectRatio: '36 / 29',
      },
      { type: 'image', src: '/images/Kelis_Mobile.png' },
    ],
    modal: {},
  },

  {
    id: 'inclusive',
    title: `Inclusive Design Toolkit`,
    category: 'Concept / Design',
    description: `We live in a diverse world. Our work should reflect that. Every decision carries assumptions—about who we’re designing for, and who we might be leaving out.

I explored a speculative toolkit to help creatives recognize and interrupt bias. Built in Figma, it combines checklists, prompts, and activities that turn inclusivity into a repeatable practice. By embedding these tools into the workflow, responsible design becomes something we practice continuously, not something we check for at the end.

The work later helped inform Square’s Diversity in Creative guidelines.`,
    type: 'image',
    src: '/images/play_test01.png',
    fitClass: 'object-cover',
    heightClass: 'h-[44vh] min-h-[320px] min-[750px]:h-[52vh]',
    widthClass:
      'w-[76vw] min-[600px]:w-[56vw] min-[850px]:w-[38vw] min-[1200px]:w-[29vw]',
    mediaItems: [  { type: 'image', src: '/images/inclusive_1.png' },
      { type: 'image', src: '/images/inclusive_4.png' },
      { type: 'image', src: '/images/inclusive_2.png' },
      { type: 'image', src: '/images/inclusive_5.png' },
      { type: 'image', src: '/images/inclusive_7.png' },
   
    
    ],
    modal: {
  
    },
  },
];

export default function TestCarouselPage() {
  const [isDragging, setIsDragging] = useState(false);
  const [activeProject, setActiveProject] = useState(null);

  const viewportRef = useRef(null);
  const setRef = useRef(null);
  const trackRef = useRef(null);
  const rafRef = useRef(0);
  const lastTimeRef = useRef(0);
  const offsetRef = useRef(0);
  const loopWidthRef = useRef(0);

  const suppressClickRef = useRef(false);
  const windowListenersRef = useRef({ move: null, up: null });

  const dragRef = useRef({
    active: false,
    pointerId: null,
    startX: 0,
    startOffset: 0,
  });

  const momentumRef = useRef({
    velocity: 0,
    lastX: 0,
    lastTime: 0,
  });

  const removeWindowPointerListeners = () => {
    const { move, up } = windowListenersRef.current;
    if (move) window.removeEventListener('pointermove', move);
    if (up) {
      window.removeEventListener('pointerup', up);
      window.removeEventListener('pointercancel', up);
    }
    windowListenersRef.current = { move: null, up: null };
  };

  useEffect(() => {
    return () => removeWindowPointerListeners();
  }, []);

  const applyOffset = (nextOffset) => {
    const track = trackRef.current;
    const loopWidth = loopWidthRef.current;

    if (!track || loopWidth <= 0) return;

    let normalized = nextOffset;

    while (normalized <= -loopWidth) {
      normalized += loopWidth;
    }

    while (normalized > 0) {
      normalized -= loopWidth;
    }

    offsetRef.current = normalized;
    track.style.transform = `translate3d(${normalized}px, 0, 0)`;
  };

  useEffect(() => {
    const measure = () => {
      const setEl = setRef.current;
      if (!setEl) return;
      loopWidthRef.current = setEl.getBoundingClientRect().width;
    };

    measure();
    window.addEventListener('resize', measure);

    return () => window.removeEventListener('resize', measure);
  }, []);

  useEffect(() => {
    if (!trackRef.current) return;

    const speedPxPerSecond = 52;
    const friction = 0.94;
    const minVelocity = 4;

    const animate = (time) => {
      if (!lastTimeRef.current) lastTimeRef.current = time;
      const dt = (time - lastTimeRef.current) / 1000;
      lastTimeRef.current = time;

      if (loopWidthRef.current > 0) {
        if (dragRef.current.active) {
          // position updated by drag handlers
        } else if (Math.abs(momentumRef.current.velocity) > minVelocity) {
          applyOffset(offsetRef.current + momentumRef.current.velocity * dt);
          momentumRef.current.velocity *= Math.pow(friction, dt * 60);
        } else {
          momentumRef.current.velocity = 0;
          applyOffset(offsetRef.current - speedPxPerSecond * dt);
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lastTimeRef.current = 0;
    };
  }, []);

  const finishDrag = () => {
    dragRef.current.active = false;
    dragRef.current.pointerId = null;
    setIsDragging(false);
    lastTimeRef.current = 0;
    removeWindowPointerListeners();

    window.setTimeout(() => {
      suppressClickRef.current = false;
    }, 0);
  };

  const handlePointerDown = (e) => {
    if (activeProject) return;
    if (loopWidthRef.current <= 0) return;

    removeWindowPointerListeners();

    dragRef.current.active = true;
    dragRef.current.pointerId = e.pointerId;
    dragRef.current.startX = e.clientX;
    dragRef.current.startOffset = offsetRef.current;

    momentumRef.current.velocity = 0;
    momentumRef.current.lastX = e.clientX;
    momentumRef.current.lastTime = performance.now();

    suppressClickRef.current = false;

    const pointerId = e.pointerId;

    const onMove = (ev) => {
      if (ev.pointerId !== pointerId) return;
      if (!dragRef.current.active) return;

      const dx = ev.clientX - dragRef.current.startX;

      if (Math.abs(dx) > 6) {
        suppressClickRef.current = true;
      }

      applyOffset(dragRef.current.startOffset + dx);

      const now = performance.now();
      const dt = (now - momentumRef.current.lastTime) / 1000;

      if (dt > 0) {
        const deltaX = ev.clientX - momentumRef.current.lastX;
        momentumRef.current.velocity = deltaX / dt;
      }

      momentumRef.current.lastX = ev.clientX;
      momentumRef.current.lastTime = now;
    };

    const onUp = (ev) => {
      if (ev.pointerId !== pointerId) return;
      finishDrag();
    };

    windowListenersRef.current.move = onMove;
    windowListenersRef.current.up = onUp;

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);

    setIsDragging(true);
    lastTimeRef.current = 0;
  };

  const handleWheel = (e) => {
    if (activeProject) return;
    if (loopWidthRef.current <= 0) return;
  
    // ✅ allow buttons (tiles) but still block real inputs / video controls
    const interactiveTarget = e.target.closest('input, [data-video-controls="true"]');
    if (interactiveTarget) return;
  
    const primaryDelta =
      Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
  
    if (primaryDelta === 0) return;
  
    e.preventDefault();
  
    applyOffset(offsetRef.current - primaryDelta);
  
    momentumRef.current.velocity = primaryDelta * -22;
    momentumRef.current.lastTime = performance.now();
  };

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    viewport.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      viewport.removeEventListener('wheel', handleWheel);
    };
  }, [activeProject]);

  const handleOpenProject = (project) => {
    setActiveProject(project);
  };

  const handleCloseOverlay = () => {
    setActiveProject(null);
    dragRef.current.active = false;
    dragRef.current.pointerId = null;
    suppressClickRef.current = false;
    setIsDragging(false);
    removeWindowPointerListeners();
  };

  return (
    <div
      className={`flex w-full flex-col bg-white ${
        activeProject ? 'min-h-screen' : 'h-[100dvh] overflow-hidden'
      }`}
    >
      <header className={`min-[850px]:pb-7 flex-shrink-0 pb-0 ${PAGE_GUTTER}`}>
      <Header
  logoName="germaine"
  tagline={'multidisciplinary designer + art director \n→ based in San Francisco, CA'}
  navItems={DEFAULT_NAV_ITEMS}
  onLogoClick={activeProject ? handleCloseOverlay : undefined}
/>
      </header>
  
      <main
        className={`flex w-full flex-1 ${
          activeProject ? 'min-h-0 overflow-y-auto' : 'min-h-0 overflow-hidden'
        }`}
      >
        {!activeProject && (
          <section
            ref={viewportRef}
            className={`flex h-full w-full min-h-0 items-end overflow-hidden select-none touch-pan-y ${PAGE_GUTTER} ${
              isDragging ? 'cursor-grabbing' : 'cursor-grab'
            }`}
            onPointerDown={handlePointerDown}
            style={{ overscrollBehaviorX: 'contain' }}
            aria-label="Project carousel"
          >
            <div className="flex w-full items-end">
              <div
                ref={trackRef}
                className="flex w-max items-end gap-[12px] will-change-transform"
              >
                <div ref={setRef} className="flex items-end gap-[12px]">
                  {TEST_PROJECTS.map((project) => (
                 <CarouselAssetCard
                 key={project.id}
                 project={project}
                 suppressClickRef={suppressClickRef}
                 onOpen={handleOpenProject}
               />
                  ))}
                </div>
  
                <div className="flex items-end gap-[12px]">
                  {TEST_PROJECTS.map((project) => (
                    <CarouselAssetCard
                      key={`${project.id}-clone`}
                      project={project}
                      suppressClickRef={suppressClickRef}
                      onOpen={handleOpenProject}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
  
        {activeProject && (
          <ProjectOverlay
            key={activeProject.id}
            project={activeProject}
            onClose={handleCloseOverlay}
          />
        )}
      </main>
  
      <div className="w-full flex-shrink-0">
        <Footer leftContent="hello@germainelau.com" rightContent="2026" />
      </div>
    </div>
  );
  }