import { useStore } from "@nanostores/react";
import { navigate } from "astro:transitions/client";
import { $currentPage } from "../stores/current-page";
import { Button } from "./button";

export function StartButton() {
  const currentPage = useStore($currentPage);
  const handleClick = () => {
    navigate(currentPage);
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
