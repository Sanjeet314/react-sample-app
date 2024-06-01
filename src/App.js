import React, { useEffect, useState } from "react";
import "./App.css";
import SetFeed from "./components/SetFeed/SetFeed";
import Feeds from "./components/Feeds/Feeds";
import useScript from "./hooks/useScript";

function App() {
  /**  When you use fetch to load the client.js file from a different origin, the browser enforces the same-origin policy and blocks the request due to CORS restrictions. This is because fetch is a cross-origin request, and the browser requires the server to send the appropriate CORS headers to allow the request.
However, when you dynamically create a script tag and set its src attribute to the URL of client.js, the browser treats it as a script import and does not enforce CORS restrictions. This is because script tags are exempt from CORS restrictions, as they are used to load external scripts that can modify the global scope of the page.
The browser allows script tags to be loaded from any origin, even if the server does not send the appropriate CORS headers. This is a security feature, as it allows developers to load scripts from CDNs and other external sources without having to worry about CORS.
So, in your case, when you use fetch, the browser blocks the request due to CORS restrictions, but when you use a script tag, the browser allows the request to proceed without any CORS errors.
It's important to note that while script tags are exempt from CORS restrictions, it's still a good practice to configure CORS on the server to ensure that other types of requests are handled securely. */
  /**
   * fetch requests and script follow different rules
   */
  /** fetch will have cors applicable */
  /** a fetch request made by script src if it is not using absolute url of its own host then it will get made through relative url of server using using it. */
  /** for script we generally try to set Content Security Policy header */
  /** if third party itself is using Content Security Policy headr then third party will have to allow CORP Cross-Origin-Resource-Policy with your url Cross-Origin-Resource-Policy: same-site, http://localhost:3000 */
  useScript("http://localhost:8080/client.js");
  // const siteInText = async () => {
  //   const data = await fetch("http://localhost:8080/client.js");
  //   const dataText = await data.text();
  //   console.log(dataText);
  // };

  // useEffect(() => {
  //   siteInText();
  // });

  return (
    <div className="App">
      <SetFeed />
      <Feeds />
    </div>
  );
}

export default App;
