all: clean build

build: build_participant build_campaign

compile: solc eth/contracts/Randao.sol --abi --bin -o ./randao/

build_release: build_participant_release build_campaign_release

build_participant:
	cd randao && go build -tags "debug" -o ./bin/participant ./participant 

build_campaign:
	cd randao/ && go build -tags "debug" -o ./bin/campaign ./campaign

build_participant_release:
	cd randao && go build -o ./bin/participant ./participant 

build_campaign_release:
	cd randao/ && go build -o ./bin/campaign ./campaign

clean:
	cd randao && rm bin/* Randao.abi Randao.bin -rf

fmt:
	cd randao && go fmt

