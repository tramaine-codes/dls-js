import { Semantics } from './grammar/filter-semantics.js';

export class Parser {
  constructor(private readonly semantics: Semantics) {}

  parse(input: string) {
    return this.semantics.evaluate(input);
  }
}
