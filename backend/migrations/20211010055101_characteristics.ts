import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('characteristics', function(table){
    table.increments('id').primary().notNullable();
	table.enu('type',['ARRAY','STRING','BOOL']);    
	table.json('ARRAY_VALUE').defaultTo('[]');
	table.string('STRING_VALUE').nullable();
	table.boolean('BOOL_VALUE').nullable();
	
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('characteristics');
}

