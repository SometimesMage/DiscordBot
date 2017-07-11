const soundFolder = require('../config').command.soundFolder;
const tauntFolder = require('../config').command.tauntFolder;

const audio = {};
const audioQueues = {};
var dispatchers = {};
var channels = {};

audio.queueFile = function(guild, channel, file) {
    guildSetup(guild);
    queueFile(guild, channel, soundFolder + file);
}

audio.queueTaunt = function(guild, channel, file) {
    guildSetup(guild);
    queueFile(guild, channel, tauntFolder + file);
}

audio.skip = function(guild) {
    if(!dispatchers.guild) {
        dispatchers.guild.end();
    }
}

audio.clearQueue = function(guild) {
    audioQueue.guild = [];
}

audio.join = function(guild, channel) {
    channel.join().then(con => {
        channels.guild = con.channel;
    });
}

audio.leave = function(guild) {
    if(channels.guild) {
        channels.guild.leave();
        channels.guild = null;
        return true;
    }

    return false;
}

//Private Functions

function guildSetup(guild) {
    audioQueues.guild = [];
    dispatchers.guild = null;
    channels.guild = null;
}

function queueFile(guild, channel, file) {
    if(!dispatchers.guild) {
        channel.join().then(con => {
            dispatchers.guild = con.playFile(file);
            channels.guild = con.channel;
            setupDispatcher(guild, dispatchers.guild);
        });
    } else {
        audioQueues.guild.concat({
            channel,
            file
        });
    }
}

function setupDispatcher(guild, dis) {
    dis.on('end', () => {
        if(audioQueues.guild.length > 0) {
            let queue = audioQueues.guild.pop();
            queue.channel.join().then(con => {
                dispatchers.guild = con.playFile(queue.file);
                channels.guild = con.channel;
                setupDispatcher(guild, dispatchers.guild);
            });
        } else {
            dispatchers.guild = null;
            audio.leave();
        }
    });

    dis.on('error', e => console.log);
}


module.exports = audio;