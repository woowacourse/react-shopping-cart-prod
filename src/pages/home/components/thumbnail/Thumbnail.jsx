import { useState } from "react";

import StyledThumbnail from "@/pages/home/components/thumbnail/Thumbnail.styled";
import Spinner from "@/components/spinner/Spinner";

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
