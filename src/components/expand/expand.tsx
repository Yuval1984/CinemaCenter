import { useNavigate } from "react-router-dom";
import { ITitleData } from "../../App";
import "./expand.scss";
import { useCinema } from "../../hooks/cinemaContext";
import Card from "../card/card";
import StarRating from "../starRating/starRating";
import { FaCalendarAlt, FaClock, FaFilm, FaUsers } from "react-icons/fa";
import { MdArrowBack } from "react-icons/md";

function Expand() {
    const { expandedTitle } = useCinema();
    const navigate = useNavigate();

    if (!expandedTitle) {
        return (
            <div className="expand-container">
                <div className="expand-empty">
                    <p>No title selected</p>
                    <button onClick={() => navigate(-1)} className="back-button">
                        <MdArrowBack /> Go Back
                    </button>
                </div>
            </div>
        );
    }

    const formatRuntime = (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        if (hours > 0) {
            return `${hours}h ${minutes}m`;
        }
        return `${minutes}m`;
    };

    const formatVoteCount = (count: number) => {
        if (count >= 1000000) {
            return `${(count / 1000000).toFixed(1)}M`;
        }
        if (count >= 1000) {
            return `${(count / 1000).toFixed(1)}K`;
        }
        return count.toString();
    };

    const getTypeLabel = (type: string) => {
        const typeMap: { [key: string]: string } = {
            movie: "Movie",
            tvSeries: "TV Series",
            tvMiniSeries: "TV Mini Series"
        };
        return typeMap[type] || type;
    };

    return (
        <div className="expand-container">
            <button onClick={() => navigate(-1)} className="back-button">
                <MdArrowBack /> Back
            </button>
            
            <div className="expand-content">
                <div className="expand-header">
                    <div className="expand-poster">
                        <Card
                            key={expandedTitle.id}
                            title={expandedTitle as ITitleData}
                            isExpanded={true}
                            onClick={() => {}}
                        />
                    </div>
                    
                    <div className="expand-info">
                        <h1 className="expand-title">{expandedTitle.primaryTitle}</h1>
                        {expandedTitle.originalTitle !== expandedTitle.primaryTitle && (
                            <h2 className="expand-original-title">{expandedTitle.originalTitle}</h2>
                        )}
                        
                        <div className="expand-meta">
                            <div className="meta-item">
                                <FaCalendarAlt className="meta-icon" />
                                <span>{expandedTitle.startYear || "N/A"}</span>
                            </div>
                            <div className="meta-item">
                                <FaClock className="meta-icon" />
                                <span>{formatRuntime(expandedTitle.runtimeSeconds || 0)}</span>
                            </div>
                            <div className="meta-item">
                                <FaFilm className="meta-icon" />
                                <span>{getTypeLabel(expandedTitle.type)}</span>
                            </div>
                        </div>

                        {expandedTitle.rating?.aggregateRating && (
                            <div className="expand-rating">
                                <StarRating rating={expandedTitle.rating.aggregateRating} />
                                {expandedTitle.rating.voteCount && (
                                    <div className="vote-count">
                                        <FaUsers className="vote-icon" />
                                        <span>{formatVoteCount(expandedTitle.rating.voteCount)} votes</span>
                                    </div>
                                )}
                            </div>
                        )}

                        {expandedTitle.genres && expandedTitle.genres.length > 0 && (
                            <div className="expand-genres">
                                {expandedTitle.genres.map((genre, index) => (
                                    <span key={index} className="genre-tag">{genre}</span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {expandedTitle.plot && (
                    <div className="expand-plot">
                        <h3>Plot</h3>
                        <p>{expandedTitle.plot}</p>
                    </div>
                )}

                <div className="expand-details">
                    <div className="detail-section">
                        <h4>Details</h4>
                        <div className="detail-grid">
                            <div className="detail-item">
                                <span className="detail-label">Type:</span>
                                <span className="detail-value">{getTypeLabel(expandedTitle.type)}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Year:</span>
                                <span className="detail-value">{expandedTitle.startYear || "N/A"}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Runtime:</span>
                                <span className="detail-value">{formatRuntime(expandedTitle.runtimeSeconds || 0)}</span>
                            </div>
                            {expandedTitle.rating?.aggregateRating && (
                                <div className="detail-item">
                                    <span className="detail-label">Rating:</span>
                                    <span className="detail-value">{expandedTitle.rating.aggregateRating.toFixed(1)} / 10</span>
                                </div>
                            )}
                            {expandedTitle.rating?.voteCount && (
                                <div className="detail-item">
                                    <span className="detail-label">Votes:</span>
                                    <span className="detail-value">{formatVoteCount(expandedTitle.rating.voteCount)}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Expand;
