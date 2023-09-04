import { createContext, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { StarIcon } from "../components/systemdesign/Icons.jsx";

const StarContext = createContext();

export function useStarContext() {
  return useContext(StarContext);
}

export function ImageProvider({ children }) {
  const starRatings = {
    fiveStar: Array(5)
      .fill(null)
      .map(() => <div key={uuidv4()}>{<StarIcon color="#1CCD83" />} </div>),
    fourStar: Array(4)
      .fill(null)
      .map(() => <div key={uuidv4()}>{<StarIcon color="#1CCD83" />} </div>),
    threeStar: Array(3)
      .fill(null)
      .map(() => <div key={uuidv4()}>{<StarIcon color="#1CCD83" />} </div>),
    twoStar: Array(2)
      .fill(null)
      .map(() => <div key={uuidv4()}>{<StarIcon color="#1CCD83" />} </div>),
    oneStar: [<div key={uuidv4()}>{<StarIcon color="#1CCD83" />} </div>],
  };

  return (
    <StarContext.Provider value={{ starRatings }}>
      {children}
    </StarContext.Provider>
  );
}
