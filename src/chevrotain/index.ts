import { FilterSemantics } from './filter/transpiler/parser/grammar/filter-semantics.js';
import { Parser } from './filter/transpiler/parser/parser.js';
import { Transpiler } from './filter/transpiler/transpiler.js';

const transpiler = new Transpiler(new Parser(FilterSemantics.build()));
const filter = transpiler.transpile('jobDate != 2004-01-13');

// biome-ignore lint/suspicious/noConsoleLog: <explanation>
console.log(filter.sql());

// biome-ignore lint/suspicious/noConsoleLog: <explanation>
console.log(filter.bind());
