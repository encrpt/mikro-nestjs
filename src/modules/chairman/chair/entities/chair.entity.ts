import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { EncrptBaseEntity } from '../../../../persistence/base-entity.entity';
import { Room } from '../../room/entities/room.entity';

@Entity({ tableName: 'chair' })
export class Chair extends EncrptBaseEntity {
  @Property({ nullable: true })
  title: string;

  @ManyToOne(() => Room, { joinColumn: 'room_id', onDelete: 'CASCADE' })
  room: Room;
}
