import {
  And,
  Category,
  Compare,
  Compound,
  DateValue,
  Filter,
  Null,
  StartDate,
} from './filter/filter.js';
import { Semantics } from './filter/transpiler/parser/grammar/filter-semantics.js';
import { Parser } from './filter/transpiler/parser/parser.js';
import { Transpiler } from './filter/transpiler/transpiler.js';

const transpiler = new Transpiler(new Parser(Semantics.build()));

// biome-ignore lint/suspicious/noConsoleLog: <explanation>
console.log(transpiler.transpile('current = true'));
// biome-ignore lint/suspicious/noConsoleLog: <explanation>
console.log(transpiler.transpile('current != false'));
// biome-ignore lint/suspicious/noConsoleLog: <explanation>
console.log(transpiler.transpile('current = false'));
// biome-ignore lint/suspicious/noConsoleLog: <explanation>
console.log(transpiler.transpile('current != true'));
// biome-ignore lint/suspicious/noConsoleLog: <explanation>
console.log(transpiler.transpile('startDate > 2000-08-09'));
// biome-ignore lint/suspicious/noConsoleLog: <explanation>
console.log(transpiler.transpile('startDate >= 2000-08-09'));
// biome-ignore lint/suspicious/noConsoleLog: <explanation>
console.log(transpiler.transpile('startDate < 2000-08-09'));
// biome-ignore lint/suspicious/noConsoleLog: <explanation>
console.log(transpiler.transpile('startDate <= 2000-08-09'));
// biome-ignore lint/suspicious/noConsoleLog: <explanation>
console.log(
  transpiler.transpile('startdate >= 2000-08-09 and startdate <= 2015-08-08')
);
// biome-ignore lint/suspicious/noConsoleLog: <explanation>
console.log(transpiler.transpile('current = true and startDate > 2000-08-09'));
// biome-ignore lint/suspicious/noConsoleLog: <explanation>
console.log(transpiler.transpile('current != true and startDate < 2000-08-09'));
// biome-ignore lint/suspicious/noConsoleLog: <explanation>
console.log(
  transpiler.transpile(
    'current = false and startdate >= 2000-08-09 and startdate <= 2015-08-08'
  )
);

const filter = new Filter(
  new Compound(
    new Compound(
      new Category(new Null()),
      new And(),
      new Compare(new StartDate(), '>=', new DateValue('2000-08-09'))
    ),
    new And(),
    new Compare(new StartDate(), '<=', new DateValue('2015-08-08'))
  )
);
// biome-ignore lint/suspicious/noConsoleLog: <explanation>
console.log(filter.produce());

const result = new Filter(
  new Compare(new StartDate(), '>', new DateValue('2000-08-3249'))
).produce();
// biome-ignore lint/suspicious/noConsoleLog: <explanation>
console.log(JSON.stringify(result, undefined, 2));
