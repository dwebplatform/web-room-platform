import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('apartments_characteristics',function(table){
		table.increments('id').primary().notNullable();
		table.integer('apartment_id').unsigned();
		table.integer('characteristic_id').unsigned();
	})
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('apartments_characteristics');

}

