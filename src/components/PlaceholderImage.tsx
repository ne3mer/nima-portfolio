interface PlaceholderImageProps {
  width: number;
  height: number;
  alt: string;
  className?: string;
}

export default function PlaceholderImage({
  width,
  height,
  alt,
  className = "",
}: PlaceholderImageProps) {
  const placeholderUrl = `https://picsum.photos/${width}/${height}?random=${Math.random()}`;

  return (
    <img
      src={placeholderUrl}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading="lazy"
    />
  );
}
