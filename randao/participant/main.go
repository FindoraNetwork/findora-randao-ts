package main

import (
	"encoding/json"
	config "findora/randao"
	"fmt"
	"os"
)

func main() {
	fmt.Println("participant main")

	dir, err := os.Getwd()
	if err != nil {
		panic(err)
	}
	fmt.Println(dir)

	conf_str, err := os.ReadFile("randao/config_campaign.json")
	if err != nil {
		fmt.Println("config file read error: ", err.Error())
		panic(err)
	}

	var conf config.ParticipantConfig
	err = json.Unmarshal(conf_str, &conf)
	if err != nil {
		fmt.Println("config file parse error: ", err.Error())
		panic(err)
	}

	fmt.Println(conf)
}
