import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  loadArrayData,
  saveArrayData,
  loadStringData,
  saveStringData,
} from '@/infrastructure/persistence/localStorage';

beforeEach(() => {
  vi.stubGlobal('localStorage', {
    getItem: vi.fn(),
    setItem: vi.fn(),
  });
});

describe('localStorage tests', () => {
  it('saves and load an array correctly', () => {
    const key = 'testArray';
    const testData = [1, 2, 3];

    saveArrayData(key, testData);
    expect(localStorage.setItem).toHaveBeenCalledWith(key, JSON.stringify(testData));

    (localStorage.getItem as jest.Mock).mockReturnValue(JSON.stringify(testData));
    const loadedData = loadArrayData<number>(key);
    expect(loadedData).toEqual(testData);
  });

  it('returns an empty array if localStorage data is null', () => {
    (localStorage.getItem as jest.Mock).mockReturnValue(null);
    const data = loadArrayData<number>('missingKey');
    expect(data).toEqual([]);
  });

  it('returns an empty array if JSON parsing fails', () => {
    (localStorage.getItem as jest.Mock).mockReturnValue('invalid JSON');
    const data = loadArrayData<number>('invalidKey');

    expect(data).toEqual([]);
  });

  it('saves and loads a string correctly', () => {
    const key = 'testString';
    const testData = 'Hello, world!';

    saveStringData(key, testData);
    expect(localStorage.setItem).toHaveBeenCalledWith(key, testData);

    (localStorage.getItem as jest.Mock).mockReturnValue(testData);
    const loadedData = loadStringData(key);
    expect(loadedData).toBe(testData);
  });

  it('should return an empty string if localStorage data is null', () => {
    localStorage.getItem.mockReturnValue(null);
    const data = loadStringData('missingKey');
    expect(data).toBe('');
  });
});
