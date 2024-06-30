import type { FilterSemantics } from './grammar/filter-semantics.js';

export class Parser {
  constructor(private readonly semantics: FilterSemantics) {}

  parse = (input: string) => this.semantics.eval(input);
}
