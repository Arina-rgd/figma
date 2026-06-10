import GalleryCard from "./GalleryCard";

export default function Gallery({ paintings }) {
  return (
    <div className="container">
      <div className="gallery-block">
        {paintings.map((painting) => (
          <GalleryCard key={painting.id} {...painting} />
        ))}
      </div>
    </div>
  );
}
