export default function cloudflareImageLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  // For local/relative images, return as-is (Cloudflare serves static assets directly)
  if (src.startsWith("/")) {
    return src;
  }
  // For remote images, use Cloudflare Image Resizing if available
  const params = [`width=${width}`, `quality=${quality || 75}`, "format=auto"];
  return `/cdn-cgi/image/${params.join(",")}/${src}`;
}
