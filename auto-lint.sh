while true; do
    if ng lint --fix; then 
        sleep 10
        clear
    else
        played_sound='\7\7\7'
        printf $played_sound
        sleep 10
    fi
done