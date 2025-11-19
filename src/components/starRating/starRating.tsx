import { FaStar } from "react-icons/fa";
import "./starRating.scss";

interface StarRatingProps {
  rating: number; // Rating from 0 to 10 (IMDB scale)
  maxRating?: number; // Max rating (default 10)
  displayRating?: number; // Stars to display (default 5)
}

function StarRating({ rating, maxRating = 10, displayRating = 5 }: StarRatingProps) {
  // Convert rating from 0-10 scale to 0-5 scale for stars
  const starRating = (rating / maxRating) * displayRating;
  const fullStars = Math.floor(starRating);
  const partialFill = starRating % 1;
  const hasPartialStar = partialFill > 0;
  const emptyStars = displayRating - fullStars - (hasPartialStar ? 1 : 0);

  return (
    <div className="star-rating">
      {Array.from({ length: fullStars }).map((_, i) => (
        <FaStar key={`full-${i}`} className="star star-full" />
      ))}
      {hasPartialStar && (
        <span key="partial" className="star-wrapper" style={{ '--fill-percentage': `${partialFill * 100}%` } as React.CSSProperties}>
          <FaStar className="star star-empty" />
          <FaStar className="star star-partial" />
        </span>
      )}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <FaStar key={`empty-${i}`} className="star star-empty" />
      ))}
      <span className="rating-value">{rating.toFixed(1)}</span>
    </div>
  );
}

export default StarRating;

