import {
  Cascade,
  Collection,
  Entity,
  OneToMany,
  Property,
} from '@mikro-orm/core';
import { EncrptBaseEntity } from '../../../../persistence/base-entity.entity';
import { Chair } from '../../chair/entities/chair.entity';

@Entity({ tableName: 'room' })
export class Room extends EncrptBaseEntity {
  @Property({ nullable: true })
  title: string;

  @OneToMany(() => Chair, (chair) => chair.room, { cascade: [Cascade.REMOVE] })
  chairs = new Collection<Chair>(this);
}
