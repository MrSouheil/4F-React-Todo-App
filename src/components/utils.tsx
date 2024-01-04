export const saveToLocalStorage = (key, value) => {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error('Error saving to local storage', error);
  }
};

export const loadFromLocalStorage = (key) => {
  try {
    const serializedValue = localStorage.getItem(key);
    return serializedValue ? JSON.parse(serializedValue) : undefined;
  } catch (error) {
    console.error('Error loading from local storage', error);
    return undefined;
  }
};


export const isDueInNext24Hours = (dueDate: string): boolean => {
    const now = new Date();
    const dueDateTime = new Date(dueDate).getTime();
    const oneDayInMs = 24 * 60 * 60 * 1000;
    return dueDateTime - now.getTime() <= oneDayInMs;
  };