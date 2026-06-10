import { ArrowIcon } from "../icons/Icons";

export default function GalleryCard({ imageUrl, title, year, artist, location }) {
  return (
    <div
      className="block-img"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <div className="block-text">
        <div className="line" />
        <div className="content-wrapper">
          <div className="text-group default">
            <p className="text-top">{title}</p>
            <p className="text-bottom">{year}</p>
          </div>
          <div className="text-group hover">
            <p className="text-top">{artist}</p>
            <p className="text-bottom">{location}</p>
          </div>
        </div>
      </div>
      <div className="arrow-btn">
        <ArrowIcon />
      </div>
    </div>
  );
}
