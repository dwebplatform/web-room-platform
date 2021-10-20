import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users',function(table){
    table.increments('id').primary().notNullable();
		table.string('email');
    // hashed password only
    table.string('password');
	}); 
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users');
}

