import Person from '../Person.js';
import Team from '../Team.js';

test('test error toThrow', () => {
  expect(() => {
    const p1 = new Person('hero', 'Magician');
    const obj1 = new Team();
    obj1.add(p1);
    obj1.add(p1);
  }).toThrow(/Персонаж уже входит в команду/);
});

test('test добавление персонажа в команду', () => {
  expect(() => {
    const p3 = new Person('hero', 'Magician');
    const p4 = new Person('hero1', 'Bowman');
    const obj2 = new Team();
    obj2.add(p3);
    obj2.add(p4);
    expect(obj2.members.size).toBe(2);
  }).toBeTruthy();
});

test('test успешное добавление', () => {
  const p = new Person('hero', 'Magician');
  const p0 = new Person('hero1', 'Bowman');
  const t = new Team();
  t.add(p);
  t.add(p0);
  expect(t).not.toMatchObject(new Team([p, p0]).members);
});

test('test преобразование в массив', () => {
  const p1 = new Person('hero', 'Magician');
  const p2 = new Person('hero1', 'Bowman');
  const team = new Team();
  team.add(p1);
  team.add(p2);
  expect(team.toArray()).toStrictEqual([...team.members]);
});

test('test успешное добавление', () => {
  const p = new Person('hero', 'Magician');
  const p0 = new Person('hero1', 'Bowman');
  const t1 = new Team();
  t1.addAll(p, p0);
  expect(t1).not.toMatchObject(new Team([p, p0]).members);
});

test('test размер множества', () => {
  expect(() => {
    const p3 = new Person('hero', 'Magician');
    const p4 = new Person('hero1', 'Bowman');
    const obj2 = new Team([p3, p4]);
    obj2.iterator();
    expect(obj2.members.size).toBe(2);
  }).toBeTruthy();
});

test('итератор вызов', () => {
  const p1 = new Person('hero', 'Magician');
  const p2 = new Person('hero1', 'Bowman');
  const team = new Team([p1, p2]);
  team.iterator();
  expect(team.toArray()).toStrictEqual([...team.members]);
});

test('test Symbol', () => {
  expect(() => {
    const p3 = new Person('hero', 'Magician');
    const p4 = new Person('hero1', 'Bowman');
    const obj2 = new Team([p3, p4]);
    obj2.addAll(p3, p4);
    obj2.iterator();
    const t = obj2.members[Symbol.iterator]();
    expect(obj2.iterator()).toBe(t.next().value);
  }).toBeTruthy();
});

test('test итератор значения', () => {
  expect(() => {
    const p = new Person('hero', 'Magician');
    const p0 = new Person('hero1', 'Bowman');
    const t = new Team();
    t.addAll(p, p0);
    const iter = t.members[Symbol.iterator]();
    expect(iter.next().value).toBe(new Team([p, p0]).members.next().value);
  }).toBeTruthy();
  /*
  expect(iter).toMatchObject(new Team([p, p0]).members);
*/
});
/*
test('test iterator2', () => {
  const p = new Person('hero', 'Magician');
  const p0 = new Person('hero1', 'Bowman');
  const t = new Team();
  t.addAll(p, p0);
  const func = t[Symbol.iterator]();
  expect(func.next()).not.toBe(new Team([p, p0]).next());
});
*/
test('test Symbol.iterator true', () => {
  expect(() => {
    const p3 = new Person('hero', 'Magician');
    const p4 = new Person('hero1', 'Bowman');
    const obj2 = new Team([p3, p4]);
    obj2.addAll(p3, p4);
    obj2.iterator();
    /*
    const t = obj2.members[Symbol.iterator]();
    */
    const func = obj2.members[Symbol.iterator]();
    /*
    expect(func.next(1)).toBe({ done: true });
    */
    expect(func.next(3)).not.toBe({ done: true });
  }).toBeTruthy();
});

test('test iterator 3', () => {
  const p = new Person('hero', 'Magician');
  const p0 = new Person('hero1', 'Bowman');
  const t = new Team();
  t.addAll(p, p0);
  t.iterator();
  const func = t.members[Symbol.iterator]().next(3);
  expect(func).not.toEqual({ done: true });
});
