import { Knex } from "knex";


//CREATED, CANCELLED, SUCCESS, PENDING
export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('comments',function(table){
    table.dropColumn('order_id');
    table.foreign('order_id').references('id').inTable('orders');
    
    // table.increments('id');
    // table.text('body');
    // table.string('order_id')
    // .references('id')
    // .inTable('orders');
    // table.foreign('order_id').references('id').inTable('orders');
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('orders').dropTable('comments');
}

