var streamTitle = nodecg.Replicant('streamTitle', {defaultValue: "GLADIATOR LEAGUE TOURNAMENTS"});
var streamTitleInput = document.getElementById('stream-title-input');
streamTitleInput.onchange = function() {
    streamTitle.value = streamTitleInput.value;
}

document.getElementById('update-pairings').onclick = updatePairings;


function updatePairings() {
    var eventId = document.getElementById('event-id').value;

    nodecg.sendMessage('test', eventId);
}
