import { useState, useEffect } from "react";
import Places from "./Places.jsx";
import Error from "./Error.jsx";

export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching, setIsFetching] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);

      try {
        const response = await fetch("http://localhost:3000/places");
        const resData = await response.json();

        // Response validation
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        setAvailablePlaces(resData.places);
      } catch (error) {
        setError({
          message: error.message || "Could not fetch data, try again later!",
        });
      }

      setIsFetching(false);
    }

    fetchData();
  }, []);

  if (error) {
    return <Error title="An Error occured!" message={error.message} />;
  }

  console.log(availablePlaces);

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Places data is loading..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}