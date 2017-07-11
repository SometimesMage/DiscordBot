const soundFolder = require('../config').command.soundFolder;
const tauntFolder = require('../config').command.tauntFolder;

const audio = {};
const audioQueue = [];
var dispatcher = null;
var curChannel = null;

audio.queueFile = function(channel, file) {
    queueFile(channel, soundFolder + file);
}

audio.queueTaunt = function(channel, file) {
    queueFile(channel, tauntFolder + file);
}

audio.skip = function() {
    if(!dispatcher) {
        dispatcher.end();
    }
}

audio.clearQueue = function() {
    audioQueue = [];
}

audio.join = function(channel) {
    channel.join().then(con => {
        curChannel = con.channel;
    });
}

audio.leave = function() {
    if(curChannel) {
        curChannel.leave();
        curChannel = null;
        return true;
    }

    return false;
}

//Private Functions

function queueFile(channel, file) {
    if(!dispatcher) {
        channel.join().then(con => {
            dispatcher = con.playFile(file);
            curChannel = con.channel;
            setupDispatcher(dispatcher);
        });
    } else {
        audioQueue.concat({
            channel,
            file
        });
    }
}

function setupDispatcher(dis) {
    dis.on('end', () => {
        if(audioQueue.length > 0) {
            let queue = audioQueue.pop();
            queue.channel.join().then(con => {
                dispatcher = con.playFile(queue.file);
                curChannel = con.channel;
                setupDispatcher(dis);
            });
        } else {
            dispatcher = null;
            audio.leave();
        }
    });

    dis.on('error', e => console.log);
}


module.exports = audio;