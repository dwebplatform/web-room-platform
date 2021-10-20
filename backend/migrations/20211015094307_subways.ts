import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('subways',function(table){
    table.increments('id').primary().notNullable();
		table.string('name');
	}); 
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('subways');
}

