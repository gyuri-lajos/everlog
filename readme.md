# Everlog

### An IPFS blog built with Metalsmith 

This is an ipfs-ready blog which is a cross between [metalwork](http://gitmx.com/ev/metalwork) and [starlog](http://github.com/ipfs/blog).

### Requirements

You need to install Node.js, npm, and go-ipfs for this project to work on your machine -- the newer the better.

### Getting started

First, launch the ipfs daemon in a new window (or background the process with `&` or tmux)

	% ipfs init # if you haven't already
	% ipfs daemon

Next, in another window...

	% git clone https://gitmx.com/ev/starsmith.git
	% cd starsmith	
	% npm install
	% make publish

This should output a local and gateway hash of your blog. 

```
node build.js
ipfs add -r -q build/ | tail -n1 >versions/current
cat versions/current >>versions/history

published blog:
- http://localhost:8080/ipfs/QmUYFRNVTeeotNfCqjKwRHH5tXudaArWjAGC7wuX6vV75V
- https://ipfs.io/ipfs/QmUYFRNVTeeotNfCqjKwRHH5tXudaArWjAGC7wuX6vV75V

next steps:
- ipfs pin add -r /ipfs/QmUYFRNVTeeotNfCqjKwRHH5tXudaArWjAGC7wuX6vV75V
```
