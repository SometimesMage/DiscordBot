const emitter = require('./index').emitter;
const audio = require('../lib/audio');

emitter.on('command', (cmd, msg) => {
    if(cmd !== 'leave') {
        return;
    }

    if(audio.leave()) {
        msg.reply('I left my voice channel!');
    } else {
        msg.reply('I am not in a voice channel!')
    }
})