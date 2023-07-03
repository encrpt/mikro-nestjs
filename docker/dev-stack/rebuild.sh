#!/bin/bash
echo "Rebuild dev server"
docker-compose stop
docker-compose up --force-recreate --build -d
