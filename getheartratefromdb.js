// -*- mode: js; indent-tabs-mode: nil; js-basic-offset: 4 -*-
//
// Copyright 2016 Giovanni Campagna <gcampagn@cs.stanford.edu>
//
// See LICENSE for details

var Tp = require('thingpedia');

module.exports = new Tp.ChannelClass({
    Name: 'getheartratefromdb',

    formatEvent(event) {
        var timestamp = event[0];
        var type = event[1];
        var amount = event[2];
        console.log('heart rate' +  'at time' + timestamp.toString() + ' is ' + amount.toString());
        return 'heart rate' +  ' at time:' + timestamp.toString() + ' is ' + amount.toString();
        
    },

    invokeQuery(filters) {
        return Tp.Helpers.Http.get('https://colby.stanford.edu/~liujas00/almondasthma/almondasthma/wsgi.py/vital/').then((data) => {
            var parsed = JSON.parse(data);
            console.log('data = ' + data.toString());
            console.log('parsed = ' + parsed.toString());
            return parsed.objects.map((object) => {
                console.log('timestamp:' + object.timestamp.toString() + 'amount=' + object.amount.toString());
                return [ object.timestamp, object.type, object.amount];
            });
        });
    }
});
