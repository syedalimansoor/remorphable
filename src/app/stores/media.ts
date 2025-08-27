import { map } from "nanostores";

interface MediaState {
  isMobile: boolean;
  isTablet: boolean;
}

export const media = map<MediaState>({
  isMobile: false,
  isTablet: false,
});

function updateMedia() {
  const width = window.innerWidth;
  media.set({
    isMobile: width < 640,
    isTablet: width >= 640 && width < 768,
  });
}

if (typeof window !== "undefined") {
  updateMedia();
  window.addEventListener("resize", updateMedia);
}
