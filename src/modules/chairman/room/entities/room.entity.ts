import {
  Cascade,
  Collection,
  Entity,
  OneToMany,
  Property,
  Unique,
} from '@mikro-orm/core';
import { EncrptBaseEntity } from '../../../../persistence/base-entity.entity';
import { Chair } from '../../chair/entities/chair.entity';
import { QueryRoomDto } from '../dto/query-room.dto';

@Entity({ tableName: 'room' })
export class Room extends EncrptBaseEntity {
  @Property({ nullable: true })
  // prevent same title
  @Unique()
  title: string;

  @OneToMany(() => Chair, (chair) => chair.room, {
    cascade: [Cascade.REMOVE],
    orphanRemoval: false,
  })
  chairs = new Collection<Chair>(this);

  toListRoomDto(): QueryRoomDto {
    const { id, title } = this;
    return {
      id,
      title,
    };
  }

  toQueryRoomDto(): QueryRoomDto {
    const { id, title, chairs } = this;
    return {
      id,
      title,
      chairs: chairs ? chairs.getItems().map((i) => i.id) : undefined,
    };
  }
}
