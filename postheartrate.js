var Tp = require('thingpedia');

module.exports = new Tp.ChannelClass({
    Name: "PostHeartRate",
    RequiredCapabilities: ['bluetooth-le'],
    
    _init: function _init(engine, device, params) {
        console.log("bluetooth LE init...");
        this.parent();
        this.device = device;
        this._btApi = engine.platform.getCapability('bluetooth-le');
        this.auth = "Basic " + (new Buffer(device.username + ':' + device.password)).toString('base64');
       
    },
    
    _doOpen: function _doOpen() {
        return this._btApi.start();
    },
    
    _doClose: function _doClose() {
        return this._btApi.stop();
    },
    
    formatEvent: function formatEvent(event, filters) {
        return '%s'.format(event);
    },
    
    sendEvent: function sendEvent(event) {
        console.log('format event ' + event.toString());
        console.log('post heart rate format event %s'.format(event) );
        
        var number = -1; // invalid value
        this._btApi.startDiscovery(10000);

        return this._btApi.getHeartRate().then(function(result) {
            console.log('heartrate returned:' + result.toString());
            if (result.toString().trim()!== "Try again later."){
                number = parseFloat(result.toString());
            }
            else{
                console.error('no heart rate is posted because it is not avaiable yet. Try again later! ' );
                return;
            }
            
            var data = JSON.stringify({amount: number , type:"hr"});
            console.log('heart rate data to be post is ' + data);
            return Tp.Helpers.Http.post(
                'https://colby.stanford.edu/~liujas00/almondasthma/almondasthma/wsgi.py/vital/?auth=', 
                data, {
                auth: this.auth,
                dataContentType: 'application/json',
                accept: 'application/json',
                extraHeaders: { 'Content-Length': Buffer.byteLength(data) }
                }).catch(function (error) {
            console.error('Error posting on heart rate monitor: ' + error.message);
            });
            
            }
        );
    }
});
