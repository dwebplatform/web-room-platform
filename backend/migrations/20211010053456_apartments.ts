import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('apartments', function(table){
    table.increments('id').primary().notNullable();
    table.string('name');
    table.string('price');
    table.text('description');
    // chars
    
    table.json('images').defaultTo('[]');

  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('apartments');
}

