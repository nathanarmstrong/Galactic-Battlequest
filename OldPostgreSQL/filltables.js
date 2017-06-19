
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('games').del()
    // .then(function () { return knex('placeholder').del() })
    // .then(function () { return knex('placeholder').del() })
    // .then(function () { return knex('placeholder').del() })

    .then(function () { return knex('friends').del() })
    .then(function () { return knex('users').del() })
    .then(function () {
      return Promise.all([
         //Inserts users seed entries
         knex('users').insert({id: 1, name: 'Alice', email: 'alice@welcome.com', password: '123'}),
         knex('users').insert({id: 2, name: 'Bob', email: 'b@b.b', password: 'bbb'}),
         knex('users').insert({id: 5, name: 'Charlie', email: 'c@c.c', password: 'ccc'})
         knex('users').insert({id: 4, name: 'Dawn', email: 'resourcewall@gmail.com', password: '789'}),
         knex('users').insert({id: 3, name: 'Elliot', email: 'e@e.e', password: 'eee'}),
      ])
    }).then(function () {
      return Promise.all([
        // Inserts friends and games seed entries



  // end of table creating //
};
