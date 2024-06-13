export const formatDate = (dateString) => {
  const date = new Date(dateString);

  // Check if the date is valid
  if (isNaN(date)) {
    return "Invalid Date";
  }

  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);

  let hour = date.getHours();
  const minutes = date.getMinutes();
  const period = hour >= 12 ? "PM" : "AM";

  // Adjust hour for 12-hour format
  hour = hour % 12 || 12;

  const formattedTime = `${hour}:${minutes
    .toString()
    .padStart(2, "0")} ${period}`;

  return `${formattedDate} | ${formattedTime}`;
};
