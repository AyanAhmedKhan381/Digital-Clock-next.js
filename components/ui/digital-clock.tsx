"use client"; // Enables client-side rendering for this component

// Import necessary hooks from React
import { useState, useEffect, useMemo } from "react";

// Import custom UI components from the UI directory
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Default export of the DigitalClockComponent function
export default function DigitalClockComponent() {
  // State hooks for managing current time, time format (24-hour or 12-hour), and component mount status
  const [time, setTime] = useState<Date>(new Date());
  const [is24Hour, setIs24Hour] = useState<boolean>(true);
  const [mounted, setMounted] = useState<boolean>(false);

  // Effect hook to run on component mount
  useEffect(() => {
    setMounted(true); // Set mounted status to true
    const interval = setInterval(() => {
      setTime(new Date()); // Update the time every second
    }, 1000);
    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []);

  // Memoized computation of formatted time to avoid unnecessary recalculations
  const formattedTime = useMemo<string>(() => {
    if (!mounted) return ""; // Don't render time on the server
    const hours = is24Hour
      ? time.getHours().toString().padStart(2, "0") // Format hours in 24-hour format
      : (time.getHours() % 12 || 12).toString().padStart(2, "0"); // Format hours in 12-hour format
    const minutes = time.getMinutes().toString().padStart(2, "0"); // Format minutes
    const seconds = time.getSeconds().toString().padStart(2, "0"); // Format seconds
    return `${hours}:${minutes}:${seconds}`; // Return formatted time string
  }, [time, is24Hour, mounted]); // Dependencies to re-run the memoized function

  // JSX return statement rendering the digital clock UI
  return (
    <div className="flex items-center justify-center h-screen bg-[url('https://cdn.pixabay.com/photo/2015/09/05/23/12/blurry-926129_640.jpg')] bg-no-repeat bg-cover bg-center bg-fixed">
      {/* Center the digital clock within the screen */}
      <Card className="p-8 hover:cursor-pointer animate-bounce
       hover:animate-pulse hover:from-pink-500 hover:to-orange-500 duration-300:
       shadow-lg rounded-2xl bg-gradient-to-tr from-yellow-500 to-red-500">
        <div className="flex flex-col items-center justify-center w-full max-w-2xl text-center space-y-4 opacity-99">
          {/* Header with title */}
          <div className="text-4xl font-bold tracking-tight text-white ">Digital Clock</div>
          {/* Description */}
          <div className="text-md text-gray-300 m-4">
            Display current time in hours, minutes, and seconds.
          </div>
          {/* Display the formatted time */}
          <div className="text-6xl shadow-xl  text-white font-bold tracking-tight">
            {formattedTime}
          </div>
          {/* Buttons to switch between 24-hour and 12-hour formats */}
          <div className="mt-4 flex items-center">
            <Button
              variant={is24Hour ? "default" : "outline"}
              onClick={() => setIs24Hour(true)}
              className="mr-2 bg-blue-700 hover:bg-blue-900 hover:p-5 rounded-xl text-white font-bold"
            >
              24-Hour Format
            </Button>
            <Button
              variant={!is24Hour ? "default" : "outline"}
              onClick={() => setIs24Hour(false)}
              className="mr-2 bg-amber-700 hover:bg-amber-800 hover:p-5 hover:text-white rounded-xl text-white font-bold"
            >
              12-Hour Format
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}