import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "timeDifference",
})
export class TimeDifferencePipe implements PipeTransform {
  transform(startDate: number, endDate: Date = new Date()): string {
    const start = new Date(startDate * 1000).getTime();
    const end = new Date(endDate).getTime();

    if (isNaN(start) || isNaN(end)) {
      return "Invalid date(s)";
    }

    const difference = Math.abs(end - start);

    const seconds = Math.floor(difference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days}` + (days === 1 ? ` day` : ` day's`);
    } else if (hours > 0) {
      return `${hours}` + (hours === 1 ? ` hour` : ` hour's`);
    } else if (minutes > 0) {
      return `${minutes}` + (minutes === 1 ? ` minute` : ` minute's`);
    } else {
      return `${seconds}` + (seconds === 1 ? ` second` : ` second's`);
    }
  }
}
