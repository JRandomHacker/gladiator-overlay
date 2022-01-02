'use strict';

import { parse } from 'csv-parse'
import { fetch, CookieJar } from 'node-fetch-cookies';

const baseUri = 'https://mtgmelee.com/';
const loginUri = baseUri + 'Account/Login';

const testData = `RoundName,RoundNumber,Player1,Player1Decklist,Player1Username,Player1Twitch,Player1Discord,Player1CheckedIn,Player2,Player2Decklist,Player2Username,Player2Twitch,Player2Discord,Player2CheckedIn,Player1GameAndByeWins,Player2GameAndByeWins,GameDraws,HasResults,Result
,1,tom Wilkinson,Azorius Control,wilko_234,wilko_234,Wilko_234#2551,True,Robert Kaloczy,Dimir Control,Robbibob,,Robbibob#2395,True,2,0,0,True,[[[%0 won %1-%2-%3|||tom Wilkinson|||2|||0|||0]]]`;


module.exports = function (nodecg) {

    const matches = nodecg.Replicant('matches');
    nodecg.listenFor('test', (eventId) => {
        nodecg.log.info('Event ID ' + eventId);

        var jar = new CookieJar();

        const params = new URLSearchParams();
        params.append('Email', nodecg.bundleConfig.username);
        params.append('Password', nodecg.bundleConfig.password);
        
        fetch(jar, loginUri, {encoding: null, method: 'GET'})
            .then(res => 
            {
                var opts = {
                    encoding: null,
                    method: 'POST',
                    body: params
                };
                fetch(jar, loginUri, opts)
                    .then(res2 => nodecg.log.info(res2));
            });


        matches.value = [];
        parse(testData, { relax_column_count: true, columns: true }, function (err, output) {
            if (output[0].RoundNumber == 1)
            {
                matches.value.push(output);
            }
        });
    });
};
