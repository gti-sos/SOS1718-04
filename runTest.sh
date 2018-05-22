#/bin/bash
case $1 in 
    heroku)
    npm test -- --params.host=RoRoMonApp.html --params.port=80
    ;;
    *)
    npm test
    ;;
esac