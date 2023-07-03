#!/bin/bash
npx mikro-orm migration:up

cd shell-seeding
./create-rooms.sh
./create-chairs.sh
