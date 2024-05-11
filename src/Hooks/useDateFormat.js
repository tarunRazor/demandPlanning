import { useState, useEffect } from "react";

function useDateFormat(dateString, locale = "en-US") {
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    // Check if the dateString is a Unix timestamp (a string of digits)
    const isUnixTimestamp = /^\d+$/.test(dateString);

    // Convert Unix timestamp from seconds to milliseconds if necessary
    const date = new Date(
      isUnixTimestamp ? parseInt(dateString, 10) * 1000 : dateString
    );

    const dateOptions = { year: "numeric", month: "long", day: "numeric" };
    const timeOptions = {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZoneName: "short",
    };

    try {
      const formattedDatePart = new Intl.DateTimeFormat(
        locale,
        dateOptions
      ).format(date);
      const formattedTimePart = new Intl.DateTimeFormat(
        locale,
        timeOptions
      ).format(date);

      // Combine date and time parts if you need the full datetime formatted
      setFormattedDate(`${formattedDatePart}`);
    } catch (error) {
      console.error("Error formatting date:", error);
      setFormattedDate("Invalid date");
    }
  }, [dateString, locale]);

  return formattedDate;
}

export default useDateFormat;
