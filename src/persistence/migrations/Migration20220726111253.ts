import { Migration } from '@mikro-orm/migrations';

export class Migration20220726111253 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "chair" alter column "room_id" drop default;');
    this.addSql('alter table "chair" alter column "room_id" type uuid using ("room_id"::text::uuid);');
    this.addSql('alter table "chair" alter column "room_id" drop not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "chair" alter column "room_id" drop default;');
    this.addSql('alter table "chair" alter column "room_id" type uuid using ("room_id"::text::uuid);');
    this.addSql('alter table "chair" alter column "room_id" set not null;');
  }

}
