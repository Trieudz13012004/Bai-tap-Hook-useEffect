import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

export default function App() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    try {
      // Try catch ko bắt lỗi của fetch .then()
      fetch("https://dogapi.dog/api/v2/breeds")
        .then((res) => res.json())
        .then((dogs) => setData(dogs.data))
        .finally(() => setIsLoading(false));
    } catch (error) {
      setError(error);
    }
  }, []);

  if (error) return <p>{error}</p>;

  if (isLoading) return <p>Loading....</p>;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        justifyContent: "space-between",
        gap: "30px",
        padding: "0px 100px"
      }}
    >
      {data.length === 0 ? (
        <p>Không có dữ liệu</p>
      ) : (
        data.map((dog) => <DogItem key={dog.id} {...dog} />)
      )}
    </div>
  );
}

const DogItem = ({ id, type, attributes }) => {
  return (
    <div style={{ width: "298px", height: "350px", justifyContent: "center"}}>{attributes.name}</div>
  );
};
