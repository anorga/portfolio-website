import Image, { type ImageProps } from "next/image";

type ThemedImageProps = Omit<
  ImageProps,
  "src" | "className" | "loading" | "preload"
> & {
  src: string;
  darkSrc?: string;
};

export function ThemedImage({ src, darkSrc, alt, ...props }: ThemedImageProps) {
  return (
    <>
      <Image
        {...props}
        src={src}
        alt={alt}
        className={darkSrc ? "preview-light" : undefined}
      />
      {darkSrc && (
        <Image {...props} src={darkSrc} alt={alt} className="preview-dark" />
      )}
    </>
  );
}
