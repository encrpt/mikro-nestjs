#!/bin/bash
# declare -a StringArrayRooms=("Entrance Hall" "Cross Hall" "East Room" "Green Room" "The Blue Room" "Red Room" "State Dining Room" "Ground Floor Corridor" "Library" "Vermeil Room" "China Room" "East Garden Room" "Oval Office" "Roosevelt Room" "West Wing Lobby")
declare -a StringArrayRooms=("Entrance Hall" "Cross Hall")

for ((i = 0; i < ${#StringArrayRooms[@]}; i++))
do
    postData='{ "title": "'${StringArrayRooms[$i]}'"}'
    # printf "\n$postData\n"
    printf "\n"
    curl -X POST http://localhost:3000/api/room \
    -H "accept: application/json" \
    -H "Content-Type: application/json" \
    -d "$postData"
done
