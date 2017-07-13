const emitter = require('./').emitter;
const audio = require('../lib/audio');

emitter.on('command', (cmd, msg) => {
    if(cmd !== 'leave') {
        return;
    }

    if(audio.leave(msg.member.guild)) {
        msg.reply('I left my voice channel!');
    } else {
        msg.reply('I am not in a voice channel!')
    }
})