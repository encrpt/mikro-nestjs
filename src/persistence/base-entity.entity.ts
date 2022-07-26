import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ abstract: true })
export abstract class EncrptBaseEntity {
  // @PrimaryKey()
  // id: string = v4();

  // Using PostgreSQL uuid-osp module function as primary key
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id: string;

  // Using BigInt as primary key (MySQL and PostgreSQL)
  // @PrimaryKey({ type: BigIntType })
  // id: string;

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}
