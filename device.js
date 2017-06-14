// -*- mode: js; indent-tabs-mode: nil; js-basic-offset: 4 -*-
//
// This file is part of ThingEngine
//
// Copyright 2015 Giovanni Campagna <gcampagn@cs.stanford.edu>
//
// See COPYING for details

var Tp = require('thingpedia');

module.exports = new Tp.DeviceClass({
Name: 'BluetoothHeartRateDevice',
    _init: function _init(engine, state) {
        this.parent(engine, state);
        this.alias = state.alias;
        this.username = state.username;
        this.password = state.password;
        this.uniqueId = 'edu.stanford.spalocz_achu8_liujas00.heartrate';
        this.name = "Bluetooth Heart Rate device ";
        this.description = "This is a Bluetooth heart rate device";
    }
});