/* Functions for rating beers using drag n drop */
function dragBeerRating(ev) {
	//ev.target.style.opacity = "0.3";
}

function dragEndRating(t) {
	//t.draggable = false;
	// ev.target.style.opacity = "0.3";
}

function dropRating(ev) {
	ev.preventDefault();
	var beer = ev.toElement.alt;
	if (sessionStorage.length == 0) { createInventory() }
	var tmp = JSON.parse(sessionStorage[beer.toLowerCase()]);
	tmp[3] = 1;
	sessionStorage[beer.toLowerCase()] = JSON.stringify(tmp);				
}

function allowDrop(ev) {
	ev.preventDefault();
}
function drag(ev) {
	ev.dataTransfer.setData("text", ev.target.alt);
}
function drop(ev) {
	ev.preventDefault();
	var data = ev.dataTransfer.getData("text");
	placeOrder(data);
}