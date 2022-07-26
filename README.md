## mikro-orm

- run PostgeSQL (e.g. docker)
- optional: run adminer (docker)
- create database chairman

```bash
# npx mikro-orm migration:create

npx mikro-orm migration:up

```

## purpose

check mikro-orm Collection.remove() WITHOUT orphanRemoval:true - keep removed items

```bash

# run room.service.spec.ts
npm run test:fails

```

... and drop a message why [**removeChairFromRoom** in room.service](https://github.com/encrpt/mikro-nestjs/blob/35669db0491b45460dbb10753b452fce5c738bef/src/modules/chairman/room/room.service.ts#L96) failed / missing commit

### Entities

#### chair

https://github.com/encrpt/mikro-nestjs/blob/master/src/modules/chairman/chair/entities/chair.entity.ts

#### room

https://github.com/encrpt/mikro-nestjs/blob/master/src/modules/chairman/room/entities/room.entity.ts
