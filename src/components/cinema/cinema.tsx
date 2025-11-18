import { useCinema } from "../../hooks/cinemaContext";
import "./cinema.css";
import Card from "../card/card";
import CardSkeleton from "../card/cardSkeleton";

function Cinema() {
    const { loading, error, filteredTitles } = useCinema();
    
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
                    <Card key={title.id} title={title} />
                ))}
            </div>
        </>
    )
}

export default Cinema;