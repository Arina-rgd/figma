export function getFilterOptions(paintings) {
  const artists = [...new Set(paintings.map((painting) => painting.artist))].sort();
  const locations = [...new Set(paintings.map((painting) => painting.location))].sort();

  return {
    artists: artists.map((artist) => ({ value: artist, label: artist })),
    locations: locations.map((location) => ({ value: location, label: location })),
  };
}
