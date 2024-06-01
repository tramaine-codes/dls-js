import type { Parser } from './parser/parser.js';

export class Transpiler {
  constructor(private readonly parser: Parser) {}

  transpile = (input: string) => this.parser.parse(input).produce();
}
