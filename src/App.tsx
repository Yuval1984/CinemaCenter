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

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
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

  return (
    <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
      {dataSource?.titles.map((title) => (
        <div
          className="card"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <img
            style={{ width: "18rem", height: "400px" }}
            src={title.primaryImage.url}
            className="card-img-top"
            alt="..."
          />
          <div
            className="card-body"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
              width: "18rem",
              padding: "20px 0",
            }}
          >
            <h5 className="card-title">{title.primaryTitle}</h5>
            {/* <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card’s content.
              {title.plot}
            </p> */}
            <a
              href="#"
              className="btn btn-primary"
              style={{ width: "100%", margin: 0 }}
            >
              show more info
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
