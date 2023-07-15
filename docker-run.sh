#!/bin/bash
/bin/randao -c /tmp/.randao/config/config.json -p /tmp/.randao/campaigns -k /tmp/.randao/keys 2>&1 | tee /tmp/.randao/findora-randao.log