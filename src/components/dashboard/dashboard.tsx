import "./dashboard.scss";
import { useCinema } from "../../hooks/cinemaContext";
import { Link, useLocation } from "react-router-dom";
import { MenuItem, Select, InputLabel, SelectChangeEvent, FormControl, TextField, Autocomplete, Pagination } from "@mui/material";
import { FaTrash } from "react-icons/fa";
import { MdMovie, MdTv, MdLocalMovies } from "react-icons/md";

function Dashboard() {
    const { favourites, cinema, selectedType, setSelectedType, filteredTitles, page, setPage, searchTitle, setSearchTitle, resetFavourites, pageTokensCount } = useCinema();
    const location = useLocation();

    const handleChange = (event: SelectChangeEvent) => {
        setSelectedType(event.target.value);
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <div className="dashboard-controls">
                    <div className="dashboard-control-group">
                        <FormControl className="dashboard-type-select" size="small">
                            <InputLabel id="type-select-label">Title Type</InputLabel>
                            <Select
                                labelId="type-select-label"
                                id="type-select"
                                value={selectedType}
                                label="Title Type"
                                onChange={handleChange}
                            >
                                <MenuItem value="movie">
                                    <MdMovie style={{ marginRight: 8 }} />
                                    Movies
                                </MenuItem>
                                <MenuItem value="tvSeries">
                                    <MdTv style={{ marginRight: 8 }} />
                                    TV Shows
                                </MenuItem>
                                <MenuItem value="tvMiniSeries">
                                    <MdLocalMovies style={{ marginRight: 8 }} />
                                    TV Mini Series
                                </MenuItem>
                                <MenuItem value="all">All</MenuItem>
                            </Select>
                        </FormControl>
                    </div>

                    <div className="dashboard-control-group">
                        <Autocomplete
                            className="dashboard-search"
                            freeSolo
                            clearOnBlur={false}
                            options={filteredTitles}
                            getOptionLabel={(option) => typeof option === 'string' ? option : option.originalTitle}
                            inputValue={searchTitle}
                            onInputChange={(_, value) => {
                                setSearchTitle(value || '');
                            }}
                            size="small"
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Search Title"
                                    variant="outlined"
                                />
                            )}
                        />
                    </div>
                </div>

                <div className="dashboard-navigation">
                    <Link
                        className={`dashboard-nav-link ${location.pathname === '/cinema' ? 'active' : ''}`}
                        to="/cinema"
                    >
                        <MdLocalMovies className="nav-icon" />
                        <span>Cinema</span>
                    </Link>
                    <Link
                        className={`dashboard-nav-link ${location.pathname === '/favourites' ? 'active' : ''}`}
                        to="/favourites"
                    >
                        <span>Favourites</span>
                    </Link>
                </div>

                <div className="dashboard-stats">
                    <div className="dashboard-stat-card favourites-stat">
                        <span className="stat-label">Favourite Titles</span>
                        <span className="stat-value">{favourites.length}</span>
                        {favourites.length > 0 && (
                            <button
                                className="stat-action-btn"
                                onClick={resetFavourites}
                                title="Clear all favourites"
                                aria-label="Clear all favourites"
                            >
                                <FaTrash />
                            </button>
                        )}
                    </div>

                    <div className="dashboard-stat-card">
                        <span className="stat-label">All Titles</span>
                        <span className="stat-value">{filteredTitles.length ?? 0}</span>
                    </div>
                </div>

                {/* <div className="dashboard-pagination">
                    <Pagination
                        page={page}
                        count={pageTokensCount}
                        onChange={(_, value) => setPage(value)}
                        variant="outlined"
                        shape="rounded"
                        color="primary"
                        size="small"
                    />
                </div> */}
            </div>
        </div>
    )
}

export default Dashboard;