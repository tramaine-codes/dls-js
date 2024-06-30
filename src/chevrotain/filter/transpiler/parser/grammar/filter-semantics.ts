import type { CstNode, IToken } from 'chevrotain';
import { Array as Arr, Option } from 'effect';
import { Filter, LegalDate, Where } from '../../../filter.js';
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
  dateValue: DateValueCstNode[];
};

interface DateValueCstNode extends CstNode {
  name: 'dateValue';
  children: DateValueCstChildren;
}

type DateValueCstChildren = {
  DateValue: IToken[];
};

// console.log(generateCstDts(FilterParser.build().getGAstProductions()));

const parser = FilterParser.build();
const BaseFilterVisitor = parser.getBaseCstVisitorConstructor();

class FilterVisitor extends BaseFilterVisitor {
  constructor() {
    super();
    this.validateVisitor();
  }

  jobDateExp = ({ dateValue }: JobDateExpCstChildren): Where =>
    new Where(this.visit(dateValue));

  dateValue = ({ DateValue }: DateValueCstChildren) => {
    const { image } = Option.getOrThrow(Arr.head(DateValue));

    return new LegalDate(image);
  };
}
