import React from "react";
import { ITitleData } from "../../App";
import Heart from "../heart/heart";
import "./card.scss";
import { FaImage } from "react-icons/fa";
import { Tooltip } from "@mui/material";
import { useCinema } from "../../hooks/cinemaContext";

function Card(props: { title: ITitleData, isExpanded?: boolean, onClick: () => void | undefined }) {
    const handleCardClick = (e: React.MouseEvent) => {
        // Don't trigger card click if clicking on the heart
        if ((e.target as HTMLElement).closest('.heart-container')) {
            return;
        }
        props.onClick();
    };

    const cardContent = (
        <div className={`cinema-card ${props.isExpanded ? 'expanded' : ''}`} onClick={handleCardClick}>
            {!props.isExpanded && <Heart title={props.title}/>}
            
            {props.title.primaryImage?.url ? (
                <img className="image" src={props.title.primaryImage.url} alt={props.title.primaryTitle} />
            ) : (
                <div className="image-placeholder">
                    <FaImage className="image-placeholder-icon" />
                    <p className="image-placeholder-text">No image available</p>
                </div>
            )}
        </div>
    );

    // Only show tooltip when not expanded
    if (props.isExpanded) {
        return cardContent;
    }

    return (
        <Tooltip title={props.title.primaryTitle}>
            {cardContent}
        </Tooltip>
    )
}

export default React.memo(Card);