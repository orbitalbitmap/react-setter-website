import getLocationString from '../../../utils/getLocationString';

describe("getLocationString function", () => {
  it("returns the expected string when passed an array of multiple inputs", () => {
    const mockGymList = [
      {name: 'Worcester'},
      {name: "Hadley"},
      {name: "Watertown"},
      {name: "Glastonbury"},
    ];

    const actualResult = getLocationString(mockGymList);
    const expectedResult = "Worcester, Hadley, Watertown, Glastonbury";

    expect(actualResult).toEqual(expectedResult);
  });
  it("returns the expected string when passed an array of a single input", () => {
    const mockGymList = [
      {name: 'Worcester'},
    ];

    const actualResult = getLocationString(mockGymList);
    const expectedResult = "Worcester";

    expect(actualResult).toEqual(expectedResult);
  });
  it("returns an empty string when passed an object instead of an array", () => {
    const mockGymList = {name: 'Worcester'};

    const actualResult = getLocationString(mockGymList);
    const expectedResult = "";

    expect(actualResult).toEqual(expectedResult);
  });
  it("returns an empty string when passed an empty array", () => {
    const mockGymList = [];

    const actualResult = getLocationString(mockGymList);
    const expectedResult = "";

    expect(actualResult).toEqual(expectedResult);
  });
});