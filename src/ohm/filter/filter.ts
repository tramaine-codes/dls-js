import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';

dayjs.extend(customParseFormat);

export interface Fragment {
  produce(): string;
}

export class Filter implements Fragment {
  constructor(private readonly fragment: Compound | Category | Compare) {}

  produce = () => this.fragment.produce();
}

export class Compound implements Fragment {
  constructor(
    private readonly left: Compound | Category | Compare,
    private readonly op: And | Or,
    private readonly right: Compound | Category | Compare
  ) {}

  produce = (): string =>
    `${this.left.produce()} ${this.op.produce()} ${this.right.produce()}`;
}

export class And implements Fragment {
  produce = () => 'AND';
}

export class Or implements Fragment {
  produce = () => 'OR';
}

export class Category implements Fragment {
  constructor(private readonly fragment: Null | NotNull) {}

  produce = () => `TRIM(current_ind) IS ${this.fragment.produce()}`;

  static from = (equality: '=' | '!=', bool: boolean) => {
    // current = true
    if (equality === '=' && bool) {
      return new Category(new NotNull());
    }

    // current != false
    if (equality === '!=' && bool === false) {
      return new Category(new NotNull());
    }

    return new Category(new Null());
  };
}

export class Null implements Fragment {
  produce = () => 'NULL';
}

export class NotNull implements Fragment {
  produce = () => `NOT ${new Null().produce()}`;
}

export class Compare implements Fragment {
  constructor(
    private readonly startDate: StartDate,
    private readonly op: string,
    private readonly date: DateValue
  ) {}

  produce = () =>
    `${this.startDate.produce()} ${this.op} ${this.date.produce()}`;
}

export class StartDate implements Fragment {
  produce = () => 'START_DATE';

  validate = () => ({
    isValid: true,
  });
}

export class DateValue implements Fragment {
  constructor(private readonly value: string) {}

  produce = () => `TO_DATE('${this.value}', 'YYYY-MM-DD')`;
}
