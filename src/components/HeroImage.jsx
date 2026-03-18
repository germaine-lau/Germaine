import Image from 'next/image';

function HeroImage({ src, alt = '', className = '' }) {
  return (
    <figure className={`relative h-full w-full overflow-hidden flex justify-start items-start ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={540}
        height={818}
        className="w-full h-auto"
        priority
      />
    </figure>
  );
}

export default HeroImage;
