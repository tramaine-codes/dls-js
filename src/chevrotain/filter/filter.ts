export interface Fragment {
  sql(): string;
  bind(): Record<string, unknown>;
}

export class Filter implements Fragment {
  constructor(private readonly fragment: Where) {}

  sql = () => this.fragment.sql();

  bind = () => this.fragment.bind();
}

export class Where implements Fragment {
  constructor(private readonly date: string) {}

  sql = () => `
WHERE
  start_date >= TO_DATE(:jobDate, 'YYYY-MM-DD')
AND
  end_date <= TO_DATE(:jobDate, 'YYYY-MM-DD')`;

  bind = () => ({ jobDate: this.date });
}
