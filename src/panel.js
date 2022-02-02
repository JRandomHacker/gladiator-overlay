var streamTitle = nodecg.Replicant('streamTitle', {defaultValue: "GLADIATOR LEAGUE TOURNAMENTS"});
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


function updatePairings() {
    var eventId = document.getElementById('event-id').value;

    nodecg.sendMessage('test', eventId);

}
