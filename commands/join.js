const emitter = require('./').emitter;
const audio = require('../lib/audio');

emitter.on('command', (cmd, msg) => {
    if(cmd !== 'join') {
        return;
    }

    if(!msg.member.voiceChannel) {
        msg.reply('you are not currently in a voice channel!');
        return;
    }

    audio.join(msg.member.guild, msg.member.voiceChannel);
    msg.reply('I joined your voice channel!');
})