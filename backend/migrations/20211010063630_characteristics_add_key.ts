import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
	return knex.schema.table('characteristics',function(table){
		table.string('key_name');
	});
}


export async function down(knex: Knex): Promise<void> {
	return knex.schema.table('characteristics',function(table){
		table.dropColumn('key_name');
	});
}

