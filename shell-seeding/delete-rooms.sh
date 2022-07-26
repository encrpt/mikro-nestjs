#!/bin/bash
# printf "\n$postData\n"
curl -X DELETE http://localhost:3000/api/room \
-H "accept: application/json" \
-H "Content-Type: application/json"
