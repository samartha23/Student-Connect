import { format } from "date-fns";

export default function parseDatetime(datettime) {
  const parsedDate = new Date(datettime);

  const formattedDate = format(parsedDate, "dd MMM yyyy - HH:mm:ss");

  return formattedDate;
}
