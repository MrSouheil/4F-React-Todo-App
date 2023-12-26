export const isDueInNext24Hours = (dueDate: string): boolean => {
    const now = new Date();
    const dueDateTime = new Date(dueDate).getTime();
    const oneDayInMs = 24 * 60 * 60 * 1000;
    return dueDateTime - now.getTime() <= oneDayInMs;
  };