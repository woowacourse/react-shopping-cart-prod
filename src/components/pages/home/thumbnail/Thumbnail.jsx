import { useState } from "react";

import Spinner from "@/components/common/spinner/Spinner";

import StyledThumbnail from "@/components/pages/home/thumbnail/Thumbnail.styled";

function Thumbnail({ src, name, onClick }) {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <StyledThumbnail className="thumbnail">
      {!isLoaded && <Spinner />}
      <img
        src={src}
        alt={name}
        onLoad={() => setIsLoaded(true)}
        onClick={onClick}
      />
    </StyledThumbnail>
  );
}

export default Thumbnail;
