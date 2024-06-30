import { Either } from 'effect';
import type { Parser } from './parser/parser.js';

export class Transpiler {
  constructor(private readonly parser: Parser) {}

  transpile = (input: string) =>
    Either.try(() => this.parser.parse(input)).pipe(
      Either.mapLeft((error) => (error as Error).message)
    );
}
