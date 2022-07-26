import { Migration } from '@mikro-orm/migrations';

export class Migration20220726075728 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "room" ("id" uuid not null default gen_random_uuid(), "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "title" varchar(255) null, constraint "room_pkey" primary key ("id"));',
    );

    this.addSql(
      'create table "chair" ("id" uuid not null default gen_random_uuid(), "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "title" varchar(255) null, "room_id" uuid not null, constraint "chair_pkey" primary key ("id"));',
    );

    this.addSql(
      'alter table "chair" add constraint "chair_room_id_foreign" foreign key ("room_id") references "room" ("id") on update cascade on delete CASCADE;',
    );
  }

  async down(): Promise<void> {
    this.addSql('alter table "chair" drop constraint "chair_room_id_foreign";');

    this.addSql('drop table if exists "room" cascade;');

    this.addSql('drop table if exists "chair" cascade;');
  }
}
