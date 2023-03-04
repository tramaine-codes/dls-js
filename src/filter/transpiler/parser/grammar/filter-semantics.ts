/* eslint-disable @typescript-eslint/no-unused-vars */
import * as ohm from 'ohm-js';
import {
  And,
  Category,
  Compare,
  Compound,
  DateValue,
  Filter,
  Or,
  StartDate,
} from '../../../filter.js';
import grammar, { FilterSemantics } from './filter.ohm-bundle.js';

export class Semantics {
  private constructor(private readonly semantics: FilterSemantics) {}

  evaluate(input: string): Filter {
    return evaluate(this.semantics(grammar.match(input)));
  }

  static build() {
    return new Semantics(semantics);
  }
}

const evaluate = (node: ohm.NonterminalNode | ohm.Dict) => {
  return node['eval']();
};
const semantics = grammar.createSemantics();

semantics.addOperation('eval()', {
  FilterExp(exp) {
    return new Filter(evaluate(exp));
  },
  Fragment(fragment) {
    return evaluate(fragment);
  },
  Fragment_compound(left, op, right) {
    return new Compound(evaluate(left), evaluate(op), evaluate(right));
  },
  CategoryFragment(_current, equality, bool) {
    return Category.from(evaluate(equality), evaluate(bool));
  },
  CompareFragment(field, op, date) {
    return new Compare(evaluate(field), evaluate(op), evaluate(date));
  },
  compoundOp(fragment) {
    return evaluate(fragment);
  },
  startDate(_) {
    return new StartDate();
  },
  categoryOp(_) {
    return this.sourceString;
  },
  compareOp(_) {
    return this.sourceString;
  },
  bool(fragment) {
    return evaluate(fragment);
  },
  date(_1, _2, _3, _4, _5, _6, _7, _8, _9, _10) {
    return new DateValue(this.sourceString);
  },
  and(_) {
    return new And();
  },
  or(_) {
    return new Or();
  },
  true(_) {
    return true;
  },
  false(_) {
    return false;
  },
});
