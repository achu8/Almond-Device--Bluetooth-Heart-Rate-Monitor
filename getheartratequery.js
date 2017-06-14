var Tp = require('thingpedia');

function getDateString(date) {
    var dateString = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    return dateString;
}

module.exports = new Tp.ChannelClass({
    Name: 'getheartratequery',
    RequiredCapabilities: ['bluetooth-le'],

    _init: function _init(engine, device) {
        console.log('bluetooth LE QUERY init...');
        this.parent();
        this.device = device;
        this._btApi = engine.platform.getCapability('bluetooth-le');
        
    },
    
     _doOpen: function _doOpen() {
        return this._btApi.start();
    },
    
    _doClose: function _doClose() {
        return this._btApi.stop();
    },
    
    formatEvent: function formatEvent(event, filters) {
        console.log(' formate event ...');
        console.log('format event ' + event.toString());
        return 'heart rate is %s'.format(event);
        // return '%s for %s costs $%f, contact %s '.format(event[0], event[1], event[2], event[3]);
    },
    
    invokeQuery: function invokeQuery(filters) {
        console.log('getheartrate invoking ... ');
        this._btApi.startDiscovery(20000);
        return this._btApi.getHeartRate().then(function(result) {
            console.log('heartrate returned:' + result.toString());
            
            return [result.toString()];
       
        });
    }
});