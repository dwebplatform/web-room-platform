import { Knex } from "knex";


//CREATED, CANCELLED, SUCCESS, PENDING
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('orders',function(table){
    table.increments('id');
    table.enu('status',['CREATED','CANCELLED','SUCCESS','PENDING']);
    table.json('info');
    table.dateTime('createdAt');
  });

}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('orders');
}

