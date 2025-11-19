import React, { useState, useEffect } from "react";
import "./heart.scss";
import { FaHeart } from "react-icons/fa";
import { ITitleData } from "../../App";
import { useCinema } from "../../hooks/cinemaContext";

function Heart(props: { title: ITitleData }) {
  const { favourites, addFavourite, removeFavourite } = useCinema();
  const [isFavourite, setIsFavourite] = useState(favourites.some(favourite => favourite.id === props.title.id));

  useEffect(() => {
    setIsFavourite(favourites.some(favourite => favourite.id === props.title.id));
  }, [favourites, props.title.id]);

  const handleHeartClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click when clicking heart
    if (isFavourite) {
      removeFavourite(props.title.id);
    } else {
      addFavourite(props.title);
    }
    setIsFavourite(!isFavourite);
  };

  return (
    <>
      <div className="heart-container">
        <FaHeart 
          className="heart-icon" 
          onClick={handleHeartClick} 
          color={isFavourite ? "red" : "white"} 
        />
      </div>
    </>
  )
}

export default React.memo(Heart);