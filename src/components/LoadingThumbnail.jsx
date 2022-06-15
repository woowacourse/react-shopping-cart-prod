import { useState } from "react";
import cn from "classnames";

import styles from "./LoadingThumbnail.module";

function LoadingThumbnail({ className, src, alt, minHeight }) {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <div
      className={cn(styles.thumbnail, className)}
      style={{ minHeight: `${minHeight}px` }}
    >
      {!isLoaded && <ThumbnailLoadingIndicator />}
      <img
        src={src}
        alt={alt || "상품 이미지"}
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
}

function ThumbnailLoadingIndicator() {
  return (
    <div className={cn(styles.indicatorWrapper)}>
      <div className={cn(styles.indicator)} />
    </div>
  );
}

export default LoadingThumbnail;
