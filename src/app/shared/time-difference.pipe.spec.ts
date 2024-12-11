import { TimeDifferencePipe } from "./time-difference.pipe";

describe("TimeDifferencePipe", () => {
  let pipe: TimeDifferencePipe;

  beforeEach(() => {
    pipe = new TimeDifferencePipe();
  });

  it('should return "Invalid date(s)" for invalid start date', () => {
    expect(pipe.transform(NaN)).toBe("Invalid date(s)");
  });

  it('should return "Invalid date(s)" for invalid end date', () => {
    expect(pipe.transform(1609459200, new Date("invalid date"))).toBe(
      "Invalid date(s)"
    );
  });

  it("should return the singular of days", () => {
    const startDate = 1609459200; // Jan 1, 2021
    const endDate = new Date("2021-01-02T00:00:00Z");
    expect(pipe.transform(startDate, endDate)).toBe("1 day");
  });

  it("should return the correct difference in days", () => {
    const startDate = 1609459200; // Jan 1, 2021
    const endDate = new Date("2021-01-03T00:00:00Z");
    expect(pipe.transform(startDate, endDate)).toBe("2 day's");
  });

  it("should return the correct difference in hours", () => {
    const startDate = 1609459200; // Jan 1, 2021
    const endDate = new Date("2021-01-01T12:00:00Z");
    expect(pipe.transform(startDate, endDate)).toBe("12 hour's");
  });

  it("should return the singular word for hours", () => {
    const startDate = 1609459200; // Jan 1, 2021
    const endDate = new Date("2021-01-01T01:00:00Z");
    expect(pipe.transform(startDate, endDate)).toBe("1 hour");
  });

  it("should return the correct difference in minutes", () => {
    const startDate = 1609459200; // Jan 1, 2021
    const endDate = new Date("2021-01-01T00:30:00Z");
    expect(pipe.transform(startDate, endDate)).toBe("30 minute's");
  });

  it("should return the singular word for minute", () => {
    const startDate = 1609459200; // Jan 1, 2021
    const endDate = new Date("2021-01-01T00:01:00Z");
    expect(pipe.transform(startDate, endDate)).toBe("1 minute");
  });

  it("should return the correct difference in seconds", () => {
    const startDate = 1609459200; // Jan 1, 2021
    const endDate = new Date("2021-01-01T00:00:30Z");
    expect(pipe.transform(startDate, endDate)).toBe("30 second's");
  });

  it("should return the singular word for seconds", () => {
    const startDate = 1609459200; // Jan 1, 2021
    const endDate = new Date("2021-01-01T00:00:01Z");
    expect(pipe.transform(startDate, endDate)).toBe("1 second");
  });

  it("should return the correct difference when endDate is not provided", () => {
    const startDate = Math.floor(Date.now() / 1000) - 3600; // 1 hour ago
    expect(pipe.transform(startDate)).toBe("1 hour");
  });
});
