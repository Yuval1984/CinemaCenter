import "./dashboard.scss";
import { useCinema } from "../../hooks/cinemaContext";
import { Link } from "react-router-dom";
function Dashboard() {
    const { favourites, cinema } = useCinema();
    return (
        <div className="dashboard-container">
            <h4 className="dashboard-favourites">Total Favourites: {favourites.length}</h4>
            <h4 className="dashboard-totalCount">Total Titles: {cinema?.titles.length ?? 0}</h4>
            <div className="dashboard-links">
                <Link className="dashboard-link" to="/cinema">Cinema</Link>
                <Link className="dashboard-link" to="/favourites">Favourites</Link>
            </div>
        </div>
    )
}

export default Dashboard;