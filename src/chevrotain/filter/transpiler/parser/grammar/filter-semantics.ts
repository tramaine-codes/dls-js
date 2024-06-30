import type { IToken } from 'chevrotain';
import { Filter, Where } from '../../../filter.js';
import { FilterParser } from './filter-parser.js';

export class FilterSemantics {
  private constructor(
    private readonly parser: FilterParser,
    private readonly visitor: FilterVisitor
  ) {}

  eval = (input: string): Filter =>
    new Filter(this.visitor.visit(this.parser.parse(input)));

  static build = () =>
    new FilterSemantics(FilterParser.build(), new FilterVisitor());
}

type JobDateExpCstChildren = {
  JobDate: IToken[];
  Equal: IToken[];
  DateValue: IToken[];
};

// console.log(generateCstDts(parser.getGAstProductions()));

const parser = FilterParser.build();
const BaseFilterVisitor = parser.getBaseCstVisitorConstructor();

class FilterVisitor extends BaseFilterVisitor {
  constructor() {
    super();
    this.validateVisitor();
  }

  jobDateExp = (ctx: JobDateExpCstChildren) =>
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    new Where(ctx.DateValue[0]!.image);
}
