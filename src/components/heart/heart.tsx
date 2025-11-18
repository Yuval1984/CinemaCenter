import { useState, useEffect } from "react";
import "./heart.scss";
import { FaHeart } from "react-icons/fa";
import { ITitleData } from "../../App";
import { useCinema } from "../../hooks/cinemaContext";

function Heart(props: { title: ITitleData }) {
  const { favourites, addFavourite, removeFavourite, resetFavourites } = useCinema();
  const [isFavourite, setIsFavourite] = useState(favourites.some(favourite => favourite.id === props.title.id));

  useEffect(() => {
    setIsFavourite(favourites.some(favourite => favourite.id === props.title.id));
  }, [favourites, props.title.id]);

  return (
    <>
      <div className="heart-container">
        <FaHeart className="heart-icon" onClick={() => {
          if (isFavourite) {
            removeFavourite(props.title.id);
          } else {
            addFavourite(props.title);
          }
          setIsFavourite(!isFavourite);
        }} color={isFavourite ? "red" : "white"} />

      </div>
    </>
  )
}

export default Heart;