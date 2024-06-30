import { isValid, parse } from 'date-fns';

export class Time {
  private isValidDate = (date: string) =>
    isValid(parse(date, 'yyyy-MM-dd', new Date()));

  static isValidDate = (date: string) => new Time().isValidDate(date);
}
