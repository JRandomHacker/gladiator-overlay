var streamTitle = nodecg.Replicant('streamTitle', {defaultValue: "GLADIATOR LEAGUE TOURNAMENTS"});
var currentMatch = nodecg.Replicant('currentMatch', {defaultValue: 
	{
		povName: "POV Name",
		povDecklist: "POV Decklist",
		opponentName: "Opponent Name",
		opponentDecklist: "Opponent Decklist"
	}});
var matches = nodecg.Replicant('matches', {defaultValue: []});

var streamTitleInput = document.getElementById('stream-title-input');
streamTitleInput.onchange = function() {
    streamTitle.value = streamTitleInput.value;
}

matches.on('change', function(newVal, oldVal) {
    var matchesList = document.getElementById('polymer-head');
    matchesList.matchNames = newVal.map(match => match.Player1Username + " - " + match.Player2Username);
});

document.getElementById('update-pairings').onclick = updatePairings;
document.getElementById('update-overlay').onclick = updateOverlay;


function updatePairings() {
    var eventId = document.getElementById('event-id').value;

    nodecg.sendMessage('test', eventId);

}

function updateOverlay() {
	var matchesDropdown = document.getElementById('feature-matches');
	var flipToggle = document.getElementById('flip-toggle');
	var selectedMatch = matches.value[matchesDropdown.selected];

	if (flipToggle.checked)
	{
		currentMatch.value = {
			povName: selectedMatch.Player2Username.toUpperCase(),
			povDecklist: selectedMatch.Player2Decklist.toUpperCase(),
			opponentName: selectedMatch.Player1Username.toUpperCase(),
			opponentDecklist: selectedMatch.Player1Decklist.toUpperCase(),
		};
	}
	else
	{
		currentMatch.value = {
			povName: selectedMatch.Player1Username.toUpperCase(),
			povDecklist: selectedMatch.Player1Decklist.toUpperCase(),
			opponentName: selectedMatch.Player2Username.toUpperCase(),
			opponentDecklist: selectedMatch.Player2Decklist.toUpperCase(),
		};
	}
}
