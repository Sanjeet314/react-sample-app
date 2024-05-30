import { useEffect, useState } from "react";

const URL = `/dataservice/feeds`;

const Feeds = () => {
  const [feedData, setFeedData] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const getNearbyFeed = async (lon, lat) => {
    const data = await fetch(`${URL}?longitude=${lon}&latitude=${lat}`);
    const jsonData = await data.json();
    setFeedData(jsonData);
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        getNearbyFeed(position.coords.longitude, position.coords.latitude);
      });
    } else {
      console.error("Navigator is not available");
    }
  }, [refresh]);

  return (
    <div>
      {feedData &&
        feedData.map((feed) => {
          return (
            <div>
              📢{feed.message} from {feed.distance}Km
            </div>
          );
        })}
      <button
        onClick={() => {
          setRefresh((refresh) => !refresh);
        }}
      >
        🔄
      </button>
    </div>
  );
};

export default Feeds;
