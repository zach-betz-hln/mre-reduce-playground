# mre-reduce-playground

For testing `.reduce` variants. Inspired by [noAccumulatingSpread](https://biomejs.dev/linter/rules/no-accumulating-spread/).

## Setup

1. Install Node.js v22+
1. Install deps: `npm i`
1. Run it: `npm run dev`

## Benchmarks

```
withForOf: 17.737ms
withFilterAndMapAndFromEntries: 15.524ms
withReduceMutateAccumulator: 8.428ms
withReduceSpreadAccumulator: 31.500s
```

Notice how `withReduceSpreadAccumulator` takes _way_ longer than the other variants.

Ran on a 2021 MacBook Pro Apple M1 Max. Your results may vary.
