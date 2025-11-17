import { ITitleData } from "../../App";
import Heart from "../heart/heart";
import "./card.scss";
function Card(props: { title: ITitleData }) {
    return (
        <div className="cinema-card">
            <Heart title={props.title} />
            {props.title.primaryImage?.url ? (
                <img className="image" src={props.title.primaryImage.url} alt={props.title.primaryTitle} />
            ) : (
                <div className="image-placeholder">No image available</div>
            )}
            {/* <div className="card-body">
                <h2 className="title">{props.title.primaryTitle}</h2>
                <p className="plot">{props.title.plot}</p>
            </div>
            <div className="footer">
                <p className="text">{props.title.genres.join(", ")}</p>
                <p className="text">{props.title.rating?.aggregateRating}</p>
                <p className="text">{props.title.rating?.voteCount}</p>
                <p className="text">{props.title.runtimeSeconds}</p>
                <p className="text">{props.title.startYear}</p>
            </div> */}
        </div>
    )
}

export default Card;