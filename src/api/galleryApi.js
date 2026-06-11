const API_URL =
  import.meta.env.VITE_API_URL || `${import.meta.env.BASE_URL}paintings.json`;

export async function fetchPaintings() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to load paintings");
  }

  const data = await response.json();

  return data.map((painting, index) => ({
    id: index + 1,
    imageUrl: painting.imageUrl,
    title: painting.title,
    year: String(painting.year),
    artist: painting.artist,
    location: painting.location,
  }));
}
