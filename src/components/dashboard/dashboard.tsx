import "./dashboard.scss";
import { useCinema } from "../../hooks/cinemaContext";
import { Link, useLocation } from "react-router-dom";
import { MenuItem, Select, InputLabel, SelectChangeEvent, FormControl, TextField, Autocomplete, Pagination } from "@mui/material";
import { FaTrash } from "react-icons/fa";
import { MdMovie, MdTv, MdLocalMovies, MdFavorite, MdLightMode, MdDarkMode, MdOpenInNew } from "react-icons/md";
import { useTheme } from "../../hooks/themeContext";
import AnimatedCounter from "../animatedCounter/animatedCounter";

function Dashboard() {
    const { favourites, cinema, selectedType, setSelectedType, filteredTitles, page, setPage, searchTitle, setSearchTitle, resetFavourites, pageTokensCount } = useCinema();
    const location = useLocation();
    const { theme, toggleTheme } = useTheme();

    const handleChange = (event: SelectChangeEvent) => {
        setSelectedType(event.target.value);
    };

    const isExpandMode = location.pathname === '/expand';

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                {!isExpandMode && (
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
                                options={filteredTitles.slice(0, 50)}
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
                                ListboxProps={{
                                    style: {
                                        maxHeight: '300px'
                                    }
                                }}
                            />
                        </div>
                    </div>
                )}

                <div className="dashboard-navigation">
                    <Link
                        className={`dashboard-nav-link ${location.pathname === '/cinema' ? 'active' : ''}`}
                        to="/cinema"
                    >
                        <MdLocalMovies className="nav-icon" />
                        <span className={`nav-text ${location.pathname === '/cinema' ? 'white' : 'black'}`}>Cinema</span>
                    </Link>
                    <Link
                        className={`dashboard-nav-link ${location.pathname === '/favourites' ? 'active' : ''}`}
                        to="/favourites"
                    >
                        <MdFavorite className="nav-icon" />
                        <span className={`nav-text ${location.pathname === '/favourites' ? 'white' : 'black'}`}>Favourites</span>
                    </Link>
                    <div
                        className={`dashboard-nav-link expand-link ${location.pathname === '/expand' ? 'active' : ''}`}
                    >
                        <MdOpenInNew className="nav-icon" />
                        <span className={`nav-text ${location.pathname === '/expand' ? 'white' : 'black'}`}>Expand</span>
                    </div>
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
                        <span className="stat-value">
                            <AnimatedCounter value={filteredTitles.length ?? 0} duration={3000} />
                        </span>
                    </div>
                </div>

                <div className="theme-toggle-container">
                    <button
                        className="theme-toggle-btn"
                        onClick={toggleTheme}
                        title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                    >
                        {theme === 'light' ? <MdDarkMode /> : <MdLightMode />}
                    </button>
                    <p className="theme-toggle-label">{theme === 'light' ? 'Light Mode' : 'Dark Mode'}</p>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;