import { Skeleton } from "@mui/material";
import "./cardSkeleton.scss";

function CardSkeleton() {
    return (
        <div className="card-skeleton">
            <Skeleton 
                variant="rectangular" 
                width={180} 
                height={250} 
                animation="wave"
                className="skeleton-image"
            />
        </div>
    );
}

export default CardSkeleton;

