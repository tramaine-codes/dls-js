import { CstParser, Lexer, createToken, type TokenType } from 'chevrotain';

/**
 * JobDateExp
 *   : "jobDate" "=" DateValue
 *
 * DateValue
 *   : Digit Digit Digit Digit "-" Digit Digit "-" Digit Digit
 *
 * Digit
 *   : '0' .. '9'
 */

export class FilterParser extends CstParser {
  private readonly lexer: Lexer;

  private constructor(tokens: TokenType[]) {
    super(tokens);
    this.lexer = new Lexer(tokens);
    this.performSelfAnalysis();
  }

  parse = (input: string) => {
    const lexingResult = this.lexer.tokenize(input);

    this.input = lexingResult.tokens;

    return this.jobDateExp();
  };

  private jobDateExp = this.RULE('jobDateExp', () => {
    this.CONSUME(JobDate);
    this.CONSUME(Equal);
    this.CONSUME(DateValue);
  });

  static build = () => new FilterParser(tokens);
}

const JobDate = createToken({ name: 'JobDate', pattern: /jobDate/i });
const Equal = createToken({ name: 'Equal', pattern: /=/ });
const DateValue = createToken({
  name: 'DateValue',
  pattern: /\d{4}-\d{2}-\d{2}/,
});
const Whitespace = createToken({
  name: 'Whitespace',
  pattern: /\s+/,
  group: Lexer.SKIPPED,
});

const tokens = [Whitespace, JobDate, Equal, DateValue];
