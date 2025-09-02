import Button, { Props } from "./components/Button";
import Alert from "./components/Alert";
import React, { useState, useEffect } from "react";
import { apiTitles } from "./services/api-data";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(apiTitles)
      .then((res) => res.json())
      .then((result: ICinemaData) => {
        setDataSource(result);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {dataSource?.titles.map((title) => (
        <div
          key={title.id}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            width: "100%",
          }}
        >
          <div>{title.primaryTitle}</div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "start",
              justifyContent: "space-between",
            }}
          >
            <img
              src={title.primaryImage.url}
              alt={title.primaryTitle}
              style={{ width: "300px", height: "auto" }}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                justifyContent: "space-between",
              }}
            >
              <div>{title.plot}</div>
              <div>{title.genres.join(", ")}</div>

              <div>{title.runtimeSeconds}</div>
              <div>{title.startYear}</div>
              <div>{title.type}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
