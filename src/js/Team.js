export default class Team {
  constructor() {
    this.members = new Set();
  }

  * [Symbol.iterator]() {
    for (let value = 0; value <= this.to; value++) {
      yield value;
    }
    // это генератор
    // и здесь есть доступ к this
    // остаётся лишь правильно написать yield
  }

  iterator() {
    this.to = this.members.size - 1;
    const t = this.members[Symbol.iterator]();
    // eslint-disable-next-line no-unused-vars
    for (const num of this) {
      console.log(num, t.next().value);
    }
  }

  add(person) {
    if (!this.members.has(person)) {
      this.members.add(person);
    } else {
      throw new Error('Персонаж уже входит в команду');
    }
  }

  addAll(...persons) {
    for (const user of persons) {
      this.members.add(user);
    }
  }

  toArray() {
    return [...this.members];
  }
}
