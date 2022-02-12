'use strict';

var parse = require('csv-parse')
var request = require('request')

const baseUri = 'https://mtgmelee.com/';
const loginUri = baseUri + 'Account/Login';


module.exports = function (nodecg) {

    const matches = nodecg.Replicant('matches');
    nodecg.listenFor('test', (eventId) => {
        nodecg.log.info('Event ID ' + eventId);


        request({
            method: 'GET',
            uri: baseUri,
            jar: true
        }, function (error, response, body) {
            request({
                method: 'GET',
                uri: loginUri,
                jar: true
            }, function (error, response, body) {
                // Parse out RVT here

                var rvt = body.match('name="__RequestVerificationToken" type="hidden" value="(.*?)"')[1];
                request({
                    method: 'POST',
                    uri: loginUri,
                    form: {
                        Email: nodecg.bundleConfig.username,
                        Password: nodecg.bundleConfig.password,
                        __RequestVerificationToken: rvt
                    },
                    jar: true,
                    headers: { '__RequestVerificationToken': rvt }
                }, function (error, response, body) {
                    var downloadUri = baseUri + 'Tournament/DownloadPairings/' + eventId;
                    request({
                        method: 'GET',
                        uri: downloadUri,
                        jar: true
                    }, function (error, response, body) {
                        parse.parse(body, { columns: true, relax_column_count: true }, function (error, records) {
                            var currentRound = Math.max.apply(Math, records.map(function(r) { return r.RoundNumber }));
                            var filteredRound = records.filter(function(r) { return r.RoundNumber == currentRound });
                            nodecg.log.info("Current round: " + currentRound);
                            nodecg.log.info(filteredRound);
                            matches.value = filteredRound;
                        });
                    });
                });
            });
        });
    });
};
