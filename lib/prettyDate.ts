import { formatDistanceToNow, formatDate, parseISO } from 'date-fns';

const PrettyDates = (date: any) => {
  const parsedDate = parseISO(date);
  const formatted = formatDistanceToNow(parsedDate, { addSuffix: true });

  return formatted;
};

export default PrettyDates;
