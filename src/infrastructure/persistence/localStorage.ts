export const loadArrayData = <T>(key: string): T[] => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error(`Error loading data from localStorage: ${error}`);
    return [];
  }
};

export const saveArrayData = <T>(key: string, data: T[]): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving data to localStorage: ${error}`);
  }
};

export const loadStringData = (key: string): string => {
  try {
    const data = localStorage.getItem(key);
    return data ? data : '';
  } catch (error) {
    console.error(`Error loading data from localStorage: ${error}`);
    return '';
  }
};

export const saveStringData = (key: string, data: string): void => {
  try {
    localStorage.setItem(key, data);
  } catch (error) {
    console.error(`Error saving data to localStorage: ${error}`);
  }
};
