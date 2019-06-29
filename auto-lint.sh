while true; do
    if ng lint; then 
        clear
    else
        played_sound='\7\7\7'
        printf $played_sound
        sleep 10
    fi
done