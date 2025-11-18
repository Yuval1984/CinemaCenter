import React from "react";
import { ITitleData } from "../../App";
import Heart from "../heart/heart";
import "./card.scss";
import { FaImage } from "react-icons/fa";
import { Tooltip } from "@mui/material";
import { useCinema } from "../../hooks/cinemaContext";

function Card(props: { title: ITitleData }) {
    const { removeFavourite } = useCinema();
    return (
        <Tooltip title={props.title.primaryTitle}>
            <div className="cinema-card">
                <Heart title={props.title}/>
                
                {props.title.primaryImage?.url ? (
                    <img className="image" src={props.title.primaryImage.url} alt={props.title.primaryTitle} />
                ) : (
                    <div className="image-placeholder">
                        <FaImage className="image-placeholder-icon" />
                        <p className="image-placeholder-text">No image available</p>
                    </div>
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
        </Tooltip>
    )
}

export default React.memo(Card);