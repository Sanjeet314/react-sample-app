import { useEffect, useState } from "react";

const SetFeed = () => {
  const [userData, setUserData] = useState({
    longitude: "",
    latitude: "",
    message: "",
    distance: "",
  });

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserData({
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
          message: "",
          distance: 3,
        });
      });
    } else {
      console.error("Navigator is not available");
    }
  }, []);

  const updateMessage = (newMessage) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      message: newMessage,
    }));
  };

  const updateDistance = (distance) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      distance: +distance,
    }));
  };

  const postData = async () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    };

    try {
      const response = await fetch("/dataservice/user/userdata", options);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      //console.log(responseData);
    } catch (error) {
      console.error("There was a problem with your fetch operation:", error);
    }
  };

  const saveUserDataToFile = () => {
    postData();
  };

  //console.log(dataDb);
  return (
    <div>
      <div>
        <p>
          You are here 📌 Lat: {userData.latitude}, Long: {userData.longitude}
        </p>
        <div style={{ marginTop: "10px" }}>
          <label>
            Write your post:
            <textarea
              value={userData.message} // ...force the input's value to match the state variable...
              onChange={(e) => {
                updateMessage(e.target.value);
              }} // ... and update the state variable on any edits!
            />
          </label>
        </div>
        <div style={{ marginTop: "10px" }}>
          📢 🔊{" "}
          <input
            type="range"
            min="1"
            max="4"
            value={userData.distance}
            onChange={(e) => {
              updateDistance(e.target.value);
            }}
          />
          <span style={{ marginLeft: "10px" }}>{`${userData.distance}Km`}</span>
        </div>
        <div style={{ marginTop: "10px" }}>
          <button onClick={() => saveUserDataToFile()}>🚀Shoot🚀</button>
        </div>
      </div>
    </div>
  );
};

export default SetFeed;
