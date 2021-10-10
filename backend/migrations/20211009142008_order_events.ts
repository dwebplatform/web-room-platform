import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('order_events', function(table){
    table.increments('id').primary().notNullable();
    table.string('event_type');
    table.json('event_value');
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('order_events')
}

