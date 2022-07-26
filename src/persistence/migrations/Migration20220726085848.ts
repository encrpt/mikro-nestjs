import { Migration } from '@mikro-orm/migrations';

export class Migration20220726085848 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "room" add constraint "room_title_unique" unique ("title");');
  }

  async down(): Promise<void> {
    this.addSql('alter table "room" drop constraint "room_title_unique";');
  }

}
