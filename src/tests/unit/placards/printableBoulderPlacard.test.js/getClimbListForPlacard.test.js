import getClimbListForPlacard from "../../../../components/placards/printableBoulderPlacard/utils/getClimbListForPlacard";

describe("getClimbListForPlacard function", () => {
  it("returns the expected result when passed valid inputs", () => {
    const startNumber = 1;
    const endNumber = 3;

    const actualResult = getClimbListForPlacard(startNumber, endNumber);
    const expectedResult = ["climb1", "climb2", "climb3"];

    expect(actualResult).toEqual(expectedResult);
  });
  it("returns an empty array when passed no inputs", () => {
    const actualResult = getClimbListForPlacard();
    const expectedResult = [];

    expect(actualResult).toEqual(expectedResult);
  }); 
  it("returns an empty array when passed string inputs", () => {
    const actualResult = getClimbListForPlacard('1', '2');
    const expectedResult = [];

    expect(actualResult).toEqual(expectedResult);
  });

  it("returns an empty array when passed boolean value inputs", () => {
    const actualResult = getClimbListForPlacard(true, false);
    const expectedResult = [];

    expect(actualResult).toEqual(expectedResult);
  });
});