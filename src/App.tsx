import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Toast } from "react-bootstrap";
import { apiTitles } from "./api/api-data";
import "./app.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { CinemaContext } from "./hooks/cinemaContext";
import Cinema from "./components/cinema/cinema";
import Dashboard from "./components/dashboard/dashboard";
import Favourites from "./components/favourites/favourites";
import { Navigate, Route, Routes } from "react-router-dom";

export interface ITitleData {
  genres: string[];
  id: string;
  originalTitle: string;
  plot: string;
  primaryImage: {
    url: string;
    width: number;
    height: number;
  };
  primaryTitle: string;
  rating: {
    aggregateRating: number;
    voteCount: number;
  };
  runtimeSeconds: number;
  startYear: number;
  type: string;
}
export interface ICinemaData {
  nextPageToken: string;
  titles: ITitleData[];
  totalCount: number;
}

function App() {
  const [cinema, setCinema] = useState<ICinemaData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [favourites, setFavourites] = useState<ITitleData[]>([]);
  const [selectedType, setSelectedType] = useState<string>("");
  const [searchTitle, setSearchTitle] = useState<string>("");
  const [page, setPage] = useState(1);
  const [pageTokens, setPageTokens] = useState<{ [key: number]: string | null }>({ 1: null });
  const [hasInitialized, setHasInitialized] = useState(false);

  const fetchMovies = useCallback(
    async (token?: string | null, pageNumber?: number) => {
      try {
        setLoading(true);
        setError(null);
  
        // Build URL dynamically
        const url = token
          ? `${apiTitles}?nextPageToken=${token}`
          : apiTitles;
  
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
  
        const data: ICinemaData = await res.json();
        console.log("cinema data:", data, "page:", pageNumber || page, "token used:", token);

        setCinema(data);

        // Save next token for the next page
        if (data.nextPageToken) {
          const currentPage = pageNumber || page;
          setPageTokens((prev) => ({
            ...prev,
            [currentPage + 1]: data.nextPageToken,
          }));
        }
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    },
    [apiTitles]
  );

  // Handle page changes
  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage);
    // Use token from previous page (page N needs token from page N-1's response)
    const token = pageTokens[newPage];
    console.log("Changing to page:", newPage, "using token:", token);
    fetchMovies(token, newPage);
  }, [pageTokens, fetchMovies]);

  // Initial fetch on mount (only once)
  useEffect(() => {
    if (!hasInitialized) {
      setHasInitialized(true);
      fetchMovies(null, 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasInitialized]);

  const addFavourite = useCallback((title: ITitleData) => {
    setFavourites((prev) => {
      // Check if already in favourites
      if (prev.some((fav) => fav.id === title.id)) {
        return prev;
      }
      return [...prev, title];
    });
  }, []);

  const removeFavourite = useCallback((id: string) => {
    setFavourites((prev) => prev.filter((fav) => fav.id !== id));
  }, []);


  const filteredTitles = useMemo(() => {
    if (!cinema?.titles) return [];
  
    let titles = cinema.titles;
  
    if (selectedType && selectedType !== "all") {
      titles = titles.filter((title) => title.type === selectedType);
    }
  
    if (searchTitle.trim()) {
      const term = searchTitle.toLowerCase();
      titles = titles.filter((title) =>
        title.originalTitle.toLowerCase().includes(term)
      );
    }
  
    return titles;
  }, [cinema, selectedType, searchTitle]);

  const filteredFavourites = useMemo(() => {
    if (!favourites || favourites.length === 0) return [];
  
    let filtered = favourites;
  
    if (selectedType && selectedType !== "all") {
      filtered = filtered.filter((title) => title.type === selectedType);
    }
  
    if (searchTitle.trim()) {
      const term = searchTitle.toLowerCase();
      filtered = filtered.filter((title) =>
        title.originalTitle.toLowerCase().includes(term)
      );
    }
  
    return filtered;
  }, [favourites, selectedType, searchTitle]);

  const resetFavourites = useCallback(() => {
    setFavourites([]);
  }, []);

  const contextValue = {
    cinema,
    loading,
    error,
    favourites,
    filteredTitles,
    filteredFavourites,
    removeFavourite,
    addFavourite,
    selectedType,
    setSelectedType,
    searchTitle,
    setSearchTitle,
    resetFavourites,
    page,
    setPage: handlePageChange,
    pageToken: pageTokens[page] || null,
    pageTokensCount: Object.keys(pageTokens).length,
    refetch: () => {
      setPageTokens({ 1: null });
      setPage(1);
      setHasInitialized(false);
      fetchMovies(null, 1);
    },
  };

  return (
    <CinemaContext.Provider value={contextValue}>
      <Dashboard />
      <Routes>
        <Route path="/" element={<Navigate to="/cinema" replace />} />
        <Route path="/cinema" element={<Cinema />} />
        <Route path="/favourites" element={<Favourites />} />
      </Routes>

    </CinemaContext.Provider>
  );

}

export default App;
