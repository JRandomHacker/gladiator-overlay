onload = function() {
    var streamTitle = nodecg.Replicant('streamTitle');
    var currentMatch = nodecg.Replicant('currentMatch');

    streamTitle.on('change', function(newVal) {
        document.getElementById('maintitle').firstChild.textContent = newVal;
    });

	currentMatch.on('change', function(newVal) {
        document.getElementById('pov-name').firstChild.textContent = newVal.povName;
        document.getElementById('pov-decklist').firstChild.textContent = newVal.povDecklist;
        document.getElementById('opponent-name').firstChild.textContent = newVal.opponentName;
        document.getElementById('opponent-decklist').firstChild.textContent = newVal.opponentDecklist;
	});
}
