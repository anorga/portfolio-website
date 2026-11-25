import Image, { getImageProps, type ImageProps } from "next/image";
import type { CSSProperties } from "react";
import { GlassInteraction } from "./glass-interaction";

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

export function PreviewGlass({
  src,
  darkSrc,
}: Pick<ThemedImageProps, "src" | "darkSrc">) {
  // The rim only samples broad color and edge detail, even on the largest cover.
  function edgeTexture(image: string) {
    const { props } = getImageProps({
      src: image,
      width: 128,
      height: 80,
      alt: "",
    });
    return `url("${props.src}")`;
  }

  return (
    <>
      <span
        aria-hidden
        className="preview-glass"
        style={
          {
            "--glass-light": edgeTexture(src),
            "--glass-dark": darkSrc ? edgeTexture(darkSrc) : undefined,
          } as CSSProperties
        }
      />
      <GlassInteraction />
    </>
  );
}
