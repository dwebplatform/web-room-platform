import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('user_tokens',function(table){
    table.increments('id').primary().notNullable();
		table.string('value');
    table.string('user_id');
	}); 
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('user_tokens');
}

