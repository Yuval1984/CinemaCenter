import { useCinema } from "../../hooks/cinemaContext";
import "./cinema.css";
import Card from "../card/card";
import CardSkeleton from "../card/cardSkeleton";
import { ITitleData } from "../../App";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

function Cinema() {
    const { loading, error, filteredTitles, setExpandedTitle } = useCinema();
    const navigate = useNavigate();
    
    const handleCardClick = useCallback((title: ITitleData) => {
        if (!navigate) {
            console.error('Navigate is not available');
            return;
        }
        setExpandedTitle(title);
        navigate('/expand');
    }, [navigate, setExpandedTitle]);
    
    if (loading) {
        return (
            <div className="card-container">
                {Array.from({ length: 12 }).map((_, index) => (
                    <CardSkeleton key={`skeleton-${index}`} />
                ))}
            </div>
        );
    }
    
    if (error) {
        return (
        <div className="center-container">
            <img className="no-data-image" src={'src/assets/no_data_fetched.png'} alt="No results" />
            <p>No titles received from the API</p>
        </div>
        );
    }
    if (!filteredTitles || filteredTitles.length === 0) {
        return (
            <div className="center-container">
                <img className="no-data-image" src={'src/assets/no_data_fetched.png'} alt="No results" />
                <p>No titles matching the search criteria</p>
            </div>
        );
    }

    return (
        <>
            <div className="card-container">
                {filteredTitles.map((title) => (
                    <Card key={title.id} title={title} onClick={() => handleCardClick(title)}/>
                ))}
            </div>
        </>
    )
}

export default Cinema;