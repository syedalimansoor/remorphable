import { useStore } from "@nanostores/react";
import { navigate } from "astro:transitions/client";
import { $currentPage } from "../stores/current-page";
import { Button } from "./button";
import { withBase } from "../utils/url";

export function StartButton() {
  const currentPage = useStore($currentPage);
  const handleClick = () => {
    navigate(withBase(`/${currentPage}`));
  };

  return (
    <Button
      variant="teal"
      size="lg"
      className="font-bold"
      onClick={handleClick}
    >
      START
    </Button>
  );
}
