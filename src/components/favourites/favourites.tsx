import "./favourites.scss";
import { useCinema } from "../../hooks/cinemaContext";
import Card from "../card/card";
function Favourites() {
    const { filteredFavourites, favourites } = useCinema();
    
    // Show message if no favourites at all
    if (!favourites || favourites.length === 0) {
        return (
            <div className="center-container">
                <img className="no-data-image" src={'src/assets/no_data_fetched.png'} alt="No results" />
                <p>No favourites yet</p>
            </div>
        );
    }
    
    // Show message if favourites exist but none match the filter
    if (!filteredFavourites || filteredFavourites.length === 0) {
        return (
            <div className="center-container">
                <img className="no-data-image" src={'src/assets/no_data_fetched.png'} alt="No results" />
                <p>No favourites matching the search criteria</p>
            </div>
        );
    }
    
    return (
        <div className="card-container">
            {filteredFavourites.map((title) => (
                <Card key={title.id} title={title} />
            ))}
        </div>
    );
}

export default Favourites;