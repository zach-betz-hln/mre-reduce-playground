import fs from 'node:fs';

type User = { id: number; active: boolean; name: string };
type UserMap = Record<number, string>;

const users: User[] = [];

for (let i = 0; i < 300_000; i++) {
  users.push({
    id: i,
    active: i % 2 === 0,
    name: `name-${i}`,
  });
}

const withForOf = (): UserMap => {
  const result: UserMap = {};
  for (const user of users) {
    if (user.active) {
      result[user.id] = user.name;
    }
  }
  return result;
};

const withFilterAndMapAndFromEntries = (): UserMap => {
  return Object.fromEntries(users.filter((user) => user.active).map((user) => [user.id, user.name]));
};

const withReduceMutateAccumulator = (): UserMap => {
  return users.reduce((acc, curr) => {
    if (curr.active) {
      acc[curr.id] = curr.name;
    }
    return acc;
  }, {} as UserMap);
};

const withReduceSpreadAccumulator = (): UserMap => {
  return users.reduce((acc, curr) => {
    if (curr.active) {
      // biome-ignore lint/performance/noAccumulatingSpread: for science
      return { ...acc, [curr.id]: curr.name };
    }
    return acc;
  }, {} as UserMap);
};

const variants = [
  {
    label: 'withForOf',
    action: withForOf,
  },
  {
    label: 'withFilterAndMapAndFromEntries',
    action: withFilterAndMapAndFromEntries,
  },
  {
    label: 'withReduceMutateAccumulator',
    action: withReduceMutateAccumulator,
  },
  {
    label: 'withReduceSpreadAccumulator',
    action: withReduceSpreadAccumulator,
  },
];

fs.rmSync('output', { force: true, recursive: true });
fs.mkdirSync('output');

for (const { label, action } of variants) {
  console.time(label);
  const data = action();
  console.timeEnd(label);
  fs.writeFileSync(`output/${label}.json`, JSON.stringify(data, null, 2), { encoding: 'utf-8' });
}
