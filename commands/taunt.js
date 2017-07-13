const fs = require('fs');
const path = require('path');

const emitter = require('./').emitter;
const audio = require('../lib/audio');
const filenames = fs.readdirSync(require('../config.json').command.tauntFolder);

emitter.on('command', (cmd, msg) => {
    if(cmd !== 'taunt') {
        return;
    }

    if(!msg.member.voiceChannel) {
        msg.reply('you are not currently in a voice channel!');
        return;
    }

    let ran = Math.floor(Math.random() * filenames.length);
    audio.queueTaunt(msg.guild.id, msg.member.voiceChannel, filenames[ran]);
})