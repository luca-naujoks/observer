import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { PosterMediaCard } from "../src/app/components/ui/PosterMediaCard";
import { IMedia } from "../src/app/interfaces";

describe("PosterMediaCard", () => {
  const mockMedia: IMedia = {
    id: 1,
    external_identifier: "test-stream",
    poster:
      "https://github.com/luca-naujoks/anistream/blob/development/public/icon.png",
    backdrop:
      "https://github.com/luca-naujoks/anistream/blob/development/public/overview.png",
    name: "Test Media",
    type: "anime",
    online_available: "true",
  };

  it("renders the media card with the correct image and alt text", () => {
    render(<PosterMediaCard media={mockMedia} unoptimized={true} />);

    const image = screen.getByAltText("poster");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", mockMedia.poster);
  });

  it("shows hover effect with media details when hovered", () => {
    render(<PosterMediaCard media={mockMedia} />);

    const linkElement = screen.getByRole("link");
    fireEvent.mouseEnter(linkElement);

    const mediaName = screen.getByText(mockMedia.name);
    const mediaType = screen.getByText(mockMedia.type);

    expect(mediaName).toBeVisible();
    expect(mediaType).toBeVisible();
  });

  it("falls back to missing poster image on error", () => {
    render(<PosterMediaCard media={mockMedia} unoptimized={true} />);

    const image = screen.getByAltText("poster");
    fireEvent.error(image);

    expect(image).toHaveAttribute(
      "src",
      "http://localhost/missing-poster.webp"
    );
  });

  it("renders a link with the correct href", () => {
    render(<PosterMediaCard media={mockMedia} />);

    const linkElement = screen.getByRole("link");
    expect(linkElement).toHaveAttribute(
      "href",
      `/media?external_identifier=${mockMedia.external_identifier}`
    );
  });
});
