import React, { useState, useEffect } from "react";
import { Toast } from "react-bootstrap";
import { apiTitles } from "./services/api-data";
import "./app.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// const buttonConfig: Props = {
//   color: "secondary",
//   children: "Click me",
//   onClick: () => {},
// };

interface ITitleData {
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
interface ICinemaData {
  nextPageToken: string;
  titles: ITitleData[];
  totalCount: number;
}

function App() {
  const [dataSource, setDataSource] = useState<ICinemaData | null>(null);
  const [allTitles, setAllTitles] = useState<ITitleData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTitle, setSelectedTitle] = useState<ITitleData | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedTitleType, setSelectedTitleType] = useState<string | null>(
    null
  );
  let filteredTitles: ITitleData[] = [];

  //initial load
  useEffect(() => {
    fetch(apiTitles)
      .then((res) => res.json())
      .then((result: ICinemaData) => {
        setDataSource(result);
        setAllTitles(result.titles);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  //initial html elements rendering
  return (
    <>
      <div
        style={{
          padding: "10px 20px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          gap: "20px",
          alignItems: "center",
          position: "sticky",
          boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
          borderRadius: "10px",
          margin: "20px 50px",
          backgroundColor: "#0dcaf0",
          top: 0,
          zIndex: 1000,
        }}
      >
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Choose Title Type
          </button>
          <ul className="dropdown-menu">
            <li>
              <a
                className="dropdown-item"
                onClick={() => {
                  setDataSource({
                    ...dataSource!,
                    titles: allTitles.filter((title) => title.type === "movie"),
                  });
                  setSelectedTitleType("movie");
                }}
              >
                Movie
              </a>
            </li>
            <li>
              <a
                className="dropdown-item"
                onClick={() => {
                  setDataSource({
                    ...dataSource!,
                    titles: allTitles.filter(
                      (title) => title.type === "tvSeries"
                    ),
                  });
                  setSelectedTitleType("tvSeries");
                }}
              >
                TV Series
              </a>
            </li>
          </ul>
        </div>

        <input
          type="email"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="search by title"
          onChange={(e) => {
            const searchTerm = e.target.value.toLowerCase();
            const filteredTitles = allTitles.filter((title) =>
              selectedTitleType
                ? title.primaryTitle.toLowerCase().includes(searchTerm) &&
                  title.type === selectedTitleType
                : title.primaryTitle.toLowerCase().includes(searchTerm)
            );

            setDataSource({
              ...dataSource!,
              titles: filteredTitles,
            });
          }}
        />
      </div>

      {selectedTitleType && (
        <>
          <div
            style={{
              display: "flex",
              position: "relative",
              flexDirection: "row",
              paddingLeft: "5px",
              gap: "10px",
              borderTopLeftRadius: "10px",
              borderBottomRightRadius: "10px",
              border: "1px solid",
              width: "100px",
              justifyContent: "flex-start",
              alignItems: "baseline",
              backgroundColor: "#ffc107",
              marginLeft: "50px",
            }}
          >
            <h6>{selectedTitleType}</h6>
            <span
              className="close"
              style={{
                cursor: "pointer",
                fontSize: "20px",
                position: "absolute",
                right: "3px",
                top: "-9px",
              }}
              onClick={() => setSelectedTitleType(null)}
            >
              &times;
            </span>
          </div>
        </>
      )}

      <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "flex-start",
            padding: "40px 50px",
            gap: "20px",
            width: "100%",
          }}
        >
          {dataSource?.titles.map((title) => (
            <div
              className="card cinema-card"
              key={title.id}
              onClick={() => {
                setSelectedTitle(title);
                filteredTitles = allTitles.filter((t) => {
                  return (
                    title.primaryTitle.toLowerCase() ===
                    t.primaryTitle.toLowerCase()
                  );
                });

                setDataSource({
                  ...dataSource!,
                  titles: filteredTitles,
                });
              }}
              onMouseEnter={() => setHoveredId(title.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <img
                style={{ width: "18rem", height: "400px" }}
                src={title.primaryImage.url}
                className="card-img-top"
                alt="..."
              />
              <div
                key={title.id}
                className="card-body"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "18rem",
                  height: selectedTitle ? "auto" : "80px",
                  padding: "15px 0px",
                  transition: "all 0.3s ease-in-out",
                  backgroundColor:
                    hoveredId === title.id ? "#000000" : undefined,
                  color: hoveredId === title.id ? "#ffffff" : undefined,
                }}
              >
                <h5
                  className="card-title"
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "clip",
                    textOverflow: "ellipsis",
                    width: "270px",
                    display: "inline-block",
                  }}
                >
                  {title.primaryTitle}
                </h5>
                <h6
                  className="card-subtitle mb-2"
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "clip",
                    textOverflow: "ellipsis",
                    width: "270px",
                    display: "inline-block",
                  }}
                >
                  {hoveredId === title.id ? title.runtimeSeconds / 60 : ""}{" "}
                  {hoveredId === title.id ? "minutes" : ""}
                </h6>
                <h6
                  className="card-subtitle mb-2"
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "clip",
                    textOverflow: "ellipsis",
                    width: "270px",
                    display: "inline-block",
                  }}
                >
                  {hoveredId === title.id ? title.startYear : ""}
                </h6>
              </div>
            </div>
          ))}
        </div>

        {selectedTitle && (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "30px",
              borderLeft: "1px solid lightgray",
              padding: "0 20px",
              marginTop: "50px",
            }}
          >
            <>
              <div
                style={{
                  width: "100%",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "inline-block",
                }}
              >
                <h1>{selectedTitle?.primaryTitle}</h1>
                <h6>year: {selectedTitle?.startYear}</h6>
                <h6>runtime: {selectedTitle?.runtimeSeconds / 60} minutes</h6>
                <h6>genres: {selectedTitle?.genres.join(", ")}</h6>
                <h6>rating: {selectedTitle?.rating.aggregateRating}</h6>
                <h6>vote count: {selectedTitle?.rating.voteCount}</h6>
                <p>{selectedTitle?.plot}</p>
              </div>
              <span
                className="close"
                onClick={() => {
                  setSelectedTitle(null);
                  setDataSource({
                    ...dataSource!,
                    titles: allTitles,
                  });
                }}
                style={{
                  cursor: "pointer",
                  fontSize: "30px",
                }}
              >
                &times;
              </span>
            </>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
