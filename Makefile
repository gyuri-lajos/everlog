local="http://localhost:8080/ipfs/"
gway="https://ipfs.io/ipfs/"

build: $(shell find src) build.js package.json
	rm -rf build
	node build.js
	ipfs get --output=build/open-sans 'QmfQyxtcLcsKoDNMFrdc4QWpMe3iZCX2tDr5E9HnUWNa7K'
	ipfs get --output=build/reserva.css 'QmcqpfFijmC6SNq5WzyimU2xs5yB9E3NenTQryU9svk5yD'

serve: $(shell find src) build.js package.json
	node build.js --watch

node_modules: package.json
	npm install
	touch node_modules

clean:

publish: build
	@ipfs swarm peers >/dev/null 2>&1 || ( \
		echo "error: ipfs daemon must be online to publish"; \
		echo "try running: ipfs daemon" && exit 1)
	ipfs add -r -q build/ | tail -n1 >versions/current
	cat versions/current >>versions/history
	@export hash=`cat versions/current`; \
		echo ""; \
		echo "published blog:"; \
		echo "- $(local)$$hash"; \
		echo "- $(gway)$$hash"; \
		echo ""; \
		echo "next steps:"; \
		echo "- ipfs pin add -r /ipfs/$$hash";

