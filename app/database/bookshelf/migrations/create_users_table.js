// initial migration of users table

export function up(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('users', function (table) {
            table.bigIncrements('id').primary().unsigned();
            table.string('first_name', 50);
            table.string('last_name', 50);
            table.string('email', 50);
            table.string('password', 255);
            table.timestamps();

            table.unique('email');
        })
    ]);
}

export function down(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('users')
    ]);
}