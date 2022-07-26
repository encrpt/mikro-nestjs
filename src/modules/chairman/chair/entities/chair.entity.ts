import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { EncrptBaseEntity } from '../../../../persistence/base-entity.entity';
import { Room } from '../../room/entities/room.entity';
import { QueryChairDto } from '../dto/query-chair.dto';

@Entity({ tableName: 'chair' })
export class Chair extends EncrptBaseEntity {
  @Property({ nullable: true })
  title: string;

  @ManyToOne(() => Room, {
    joinColumn: 'room_id',
    onDelete: 'CASCADE',
    nullable: true,
  })
  room: Room;

  toQueryChairDto(): QueryChairDto {
    const { id, title, room } = this;
    return { id, title, roomId: room ? room.id : undefined };
  }
}
