import { Console, Effect } from 'effect';
import { FilterSemantics } from './filter/transpiler/parser/grammar/filter-semantics.js';
import { Parser } from './filter/transpiler/parser/parser.js';
import { Transpiler } from './filter/transpiler/transpiler.js';

const transpiler = new Transpiler(new Parser(FilterSemantics.build()));
const filter = transpiler.transpile('jobDate = 2004-01-13');

Effect.runSyncExit(
  filter.pipe(
    Effect.tapBoth({
      onFailure: (message) => Console.error(message),
      onSuccess: (filter) =>
        Console.log(filter.sql()).pipe(
          Effect.andThen(() => Console.log(filter.bind()))
        ),
    })
  )
);
