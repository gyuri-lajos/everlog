### Starsmith

This is a project attempting to merge the work the IPFS crew has put into their Starlog (built with Metalsmith) with Metalwork (built with Metalsmith).

The goal is to have a blog that both does what I want and is also deployable to IPFS.

### Requirements

You need to install Node.js, npm, and go-ipfs for this project to work on your machine -- newer the better.

### Getting started

First, launch the ipfs daemon

	% ipfs init # if you haven't already
	% ipfs daemon

Next, in another window...

	% git clone https://gitmx.com/ev/starsmith.git
	% cd starsmith	
	% npm install
	% make publish

This should output a local and gateway hash of your blog. 
