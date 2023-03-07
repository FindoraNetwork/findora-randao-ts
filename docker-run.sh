#!/bin/bash
nohup /bin/randao -c config/config.json -d /tmp/.randao/ > /tmp/findora-randao.log 2>&1 &
/bin/bash -c "while true;do echo hello;sleep 50000;done"