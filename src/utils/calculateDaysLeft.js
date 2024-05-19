const calculateDaysLeft = (duedate) => {
  const currentDate = new Date();
  const dueDateObject = new Date(duedate);

  const timeDifference = dueDateObject - currentDate;

  const days = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

  return days;
};

export default calculateDaysLeft;
