const apiKey = "AIzaSyAzDiXk6B1fgbZ8tBZegguqvyyLsYN5yW0"; // Replace with your actual API key
const searchText = "삼겹살"; // Replace with your desired search text

// Function to encode special characters in the URL
const encodeUrl = (url) => {
  return encodeURI(url).replace(/%5B/g, "[").replace(/%5D/g, "]");
};

const boundary = {
  north: 37.750023, // Replace with the northern latitude boundary
  west: 128.8911162, // Replace with the western longitude boundary
  south: 37.749319, // Replace with the southern latitude boundary
  east: 128.893, // Replace with the eastern longitude boundary
};

// Function to search for a place using a text query
/**
 * @param text
 * @param latitude
 * @param longitude
 * @param radius meter
 * @returns results Array
 */
export const searchPlaces = async (text, { latitude, longitude, radius }) => {
  const encodedText = encodeUrl(text);
  const apiUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodedText}&key=${apiKey}&language=ko&location=${latitude},${longitude}&radius=${radius}`;

  try {
    const response = await fetch(apiUrl);
    const response2 = await response.json();

    return response2.results;
  } catch (error) {
    console.error("Error:", error.message);
  }
};
