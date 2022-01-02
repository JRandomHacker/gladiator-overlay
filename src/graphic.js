onload = function() {
    var streamTitle = nodecg.Replicant('streamTitle', {defaultValue: "GLADIATOR LEAGUE TOURNAMENTS"});

    streamTitle.on('change', function(newVal, oldVal) {
        document.getElementById('maintitle').firstChild.textContent = newVal;
    });
}
