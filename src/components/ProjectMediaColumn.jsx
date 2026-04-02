'use client';

import { useEffect, useMemo, useState } from 'react';

function MediaBlock({ item, priority = false }) {
  if (!item?.src) return null;

  if (item.type === 'video') {
    return (
      <div className="overflow-hidden">
        <video
          src={item.src}
          className="block h-auto w-full"
          style={{ aspectRatio: item.aspectRatio ?? '16 / 9' }}
          autoPlay
          muted
          playsInline
          loop={item.loop ?? true}
          controls
          preload={priority ? 'auto' : 'metadata'}
        />
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      <img
        src={item.src}
        alt=""
        className="block h-auto w-full"
        loading={priority ? 'eager' : 'lazy'}
      />
    </div>
  );
}

function chunkPairs(items) {
  const rows = [];
  for (let i = 0; i < items.length; i += 2) {
    rows.push(items.slice(i, i + 2));
  }
  return rows;
}

export default function ProjectMediaColumn({ mediaItems = [] }) {
  const [imageRatios, setImageRatios] = useState({});

  useEffect(() => {
    const imageItems = mediaItems.filter(
      (item) => item?.type === 'image' && item?.src
    );

    imageItems.forEach((item) => {
      if (imageRatios[item.src]) return;

      const img = new window.Image();
      img.src = item.src;

      const saveRatio = () => {
        if (!img.naturalWidth || !img.naturalHeight) return;

        setImageRatios((prev) => ({
          ...prev,
          [item.src]: img.naturalWidth / img.naturalHeight,
        }));
      };

      if (img.complete) {
        saveRatio();
      } else {
        img.onload = saveRatio;
      }
    });
  }, [mediaItems, imageRatios]);

  const [heroVideo, ...remaining] = mediaItems;
  const pairRows = useMemo(() => chunkPairs(remaining.slice(0, 4)), [remaining]);
  const stacked = remaining.slice(4);

  return (
    <div className="flex flex-col gap-6 pt-8 min-[750px]:gap-8 min-[750px]:pt-10">
      <MediaBlock item={heroVideo} priority />

      {pairRows.map((row, rowIndex) => (
        <div
          key={`pair-row-${rowIndex}`}
          className="flex flex-col gap-6 min-[1100px]:flex-row min-[1100px]:gap-8"
        >
          {row.map((item, index) => {
            const ratio =
              item.type === 'image'
                ? imageRatios[item.src] || 1
                : (() => {
                    const [w, h] = (item.aspectRatio ?? '16 / 9')
                      .split('/')
                      .map((v) => Number(v.trim()));
                    return w && h ? w / h : 16 / 9;
                  })();

            return (
              <div
                key={`${item.src}-${index}`}
                className="min-w-0"
                style={{ flex: `${ratio} ${ratio} 0` }}
              >
                <MediaBlock item={item} />
              </div>
            );
          })}
        </div>
      ))}

      {stacked.map((item, index) => (
        <MediaBlock key={`${item.src}-${index}`} item={item} />
      ))}
    </div>
  );
}