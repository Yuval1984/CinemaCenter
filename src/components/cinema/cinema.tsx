import { useState } from "react";
import { useCinema } from "../../hooks/cinemaContext";
import { ITitleData, ICinemaData } from "../../App";
import "./cinema.css";
import Card from "../card/card";

function Cinema() {
    const { cinema, loading, error, refetch } = useCinema();
    if (loading) return <p>Loading movies...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!cinema) return <p>No cinema data yet.</p>;
    return (
        <>
            <div className="card-container">
                {cinema.titles.map((title) => (
                    <Card key={title.id} title={title} />
                ))}
            </div>
        </>
    )
}

export default Cinema;