#!/bin/bash
declare -a StringArrayChairs=("WIRE CHAIR" "TULIP CHAIR" "EGG CHAIR" "DIAMOND CHAIR" "Chinese armchair" "English side chair" "American Armchair" "Plastic garden chair" "THONET BENTWOOD ARMCHAIR" "WASSILY CHAIR" "BARCELONA CHAIR" "TUBULAR BRNO CHAIR" "CITE ARMCHAIR" "WOMB CHAIR" "Dining Armchair Rod" "PANTON CHAIR" "SHELL CHAIR" "HIGH STICKING CHAIR" "PRINCE AHA STOOL" "LOUIS GHOST CHAIR" "MASTERS CHAIR" "Stacking Chair" "Papa Bear" "Grand Confort" "Thonet 209" "Tulip" "B32/Cesca" "Transat")
for ((i = 0; i < ${#StringArrayChairs[@]}; i++))
do
    postData='{ "title": "'${StringArrayChairs[$i]}'"}'
    # printf "\n$postData\n"
    printf "\n"
    curl -X POST http://localhost:3000/api/chair \
    -H "accept: application/json" \
    -H "Content-Type: application/json" \
    -d "$postData"
done