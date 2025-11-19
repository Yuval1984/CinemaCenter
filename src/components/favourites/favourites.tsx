import "./favourites.scss";
import { useCinema } from "../../hooks/cinemaContext";
import Card from "../card/card";
import { ITitleData } from "../../App";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import noDataImage from "../../assets/no_data_fetched.png";

function Favourites() {
    const { filteredFavourites, favourites, setExpandedTitle } = useCinema();
    const navigate = useNavigate();
    
    const handleCardClick = useCallback((title: ITitleData) => {
        if (!navigate) {
            console.error('Navigate is not available');
            return;
        }
        setExpandedTitle(title);
        navigate('/expand');
    }, [navigate, setExpandedTitle]);
    // Show message if no favourites at all
    if (!favourites || favourites.length === 0) {
        return (
            <div className="center-container">
                <img className="no-data-image" src={noDataImage} alt="No results" />
                <p>No favourites yet</p>
            </div>
        );
    }
    
    // Show message if favourites exist but none match the filter
    if (!filteredFavourites || filteredFavourites.length === 0) {
        return (
            <div className="center-container">
                <img className="no-data-image" src={noDataImage} alt="No results" />
                <p>No favourites matching the search criteria</p>
            </div>
        );
    }
    
    return (
        <div className="card-container">
            {filteredFavourites.map((title) => (
                <Card key={title.id} title={title} onClick={() => handleCardClick(title)}/>
            ))}
        </div>
    );
}

export default Favourites;