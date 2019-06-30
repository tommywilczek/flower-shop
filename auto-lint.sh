while true; do
    if ng lint --fix; then 
        clear
    else
        played_sound='\7\7\7'
        printf $played_sound
        sleep 20
    fi
    sleep 20
done