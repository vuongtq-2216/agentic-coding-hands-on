import Image from "next/image";

type ImageGalleryProps = {
  imageUrls: string[];
};

export function ImageGallery({ imageUrls }: ImageGalleryProps) {
  if (imageUrls.length === 0) return null;

  const images = imageUrls.slice(0, 5);

  return (
    <div className="flex flex-row gap-4 overflow-x-auto">
      {images.map((url, index) => (
        <Image
          key={index}
          src={url}
          alt={`Kudos image ${index + 1}`}
          width={88}
          height={88}
          className="rounded-[18px] object-cover shrink-0"
          style={{
            width: 88,
            height: 88,
            border: "1px solid #998C5F",
          }}
        />
      ))}
    </div>
  );
}
