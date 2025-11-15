import React, { useState, useEffect, useCallback } from "react";
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

  const fetchMovies = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(apiTitles);
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data: ICinemaData = await res.json();
      setCinema(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

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

  const contextValue = {
    cinema,
    loading,
    error,
    favourites,
    removeFavourite,
    addFavourite,
    refetch: fetchMovies,
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
