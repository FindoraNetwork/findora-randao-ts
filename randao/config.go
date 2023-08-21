package config

type ParticipantConfig struct {
	Http_listen string `json:"http_listen"`
	Chain       struct {
		Name        string `json:"name"`
		Chain_id    string `json:"chain_id"`
		Endpoint    string `json:"endpoint"`
		Participant string `json:"participant"`
		Randao      string `json:"randao"`
		Opts        struct {
			GasLimit        string `json:"gas_limit"`
			MaxGasPrice     string `json:"max_gas_price"`
			MinGasReserve   string `json:"min_gas_reserve"`
			MaxDeposit      uint64 `json:"max_deposit"`
			MinRateOfReturn uint64 `json:"min_rate_of_return"`
			MinRevealWindow uint64 `json:"min_reveal_window"`
			MaxRevealDelay  uint64 `json:"max_reveal_delay"`
			MaxCampaigns    uint64 `json:"max_campaigns"`
			StartBlock      uint64 `json:"start_block"`
		} `json:"opts"`
	} `json:"chain"`
}

type CampaignConfig struct {
	Http_listen string `json:"http_listen"`
	Chain       struct {
		Name        string `json:"name"`
		Chain_id    string `json:"chain_id"`
		Endpoint    string `json:"endpoint"`
		Participant string `json:"participant"`
		Randao      string `json:"randao"`
		Opts        struct {
			GasLimit        string `json:"gas_limit"`
			MaxGasPrice     string `json:"max_gas_price"`
			MinGasReserve   string `json:"min_gas_reserve"`
			MaxDeposit      uint64 `json:"max_deposit"`
			MinRateOfReturn uint64 `json:"min_rate_of_return"`
			MinRevealWindow uint64 `json:"min_reveal_window"`
			MaxRevealDelay  uint64 `json:"max_reveal_delay"`
			MaxCampaigns    uint64 `json:"max_campaigns"`
			StartBlock      uint64 `json:"start_block"`
		} `json:"opts"`
	} `json:"chain"`
}
