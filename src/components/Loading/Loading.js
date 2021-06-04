import React, { useState, useEffect } from "react";
import "./style.css";

export default function Loading() {
  const [isLoading, setisLoading] = useState(true);
  useEffect(() => {
    const interval = setInterval(() => {
      setisLoading(false);
    }, 4900);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <div className={`loading__body ${!isLoading && "fadeOut"}`}>
      <p>Welcome to Cyber Radar</p>
    </div>
  );
}
