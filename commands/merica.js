const emitter = require('./index').emitter;
const audio = require('../lib/audio');

emitter.on('command', (cmd, msg) => {
    if(cmd !== 'merica') {
        return;
    }

    if(!msg.member.voiceChannel) {
        msg.reply('you are not currently in a voice channel!');
        return;
    }

    audio.queueFile(msg.member.voiceChannel, 'fuck-yeah.wav');
})