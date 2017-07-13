const emitter = require('./index').emitter;
const commands = require('../config.json').commands;
const audio = require('../lib/audio');

emitter.on('command', (cmd, msg) => {
    let command = commands[cmd];

    if(!command) {
        return;
    }

    switch(command.type) {
        case 'reply':
            handleReply(command, msg);
            break;
        case 'text':
            handleText(command, msg);
            break;
        case 'embed':
            handleEmbed(command, msg);
            break;
        case 'sound':
            handleSound(command, msg);
            break;
    }
});

function handleReply(cmd, msg) {
    if(!cmd.content) {
        console.error('Couldn\'t have a content property!');
        return;
    }

    msg.reply(cmd.content);
}

function handleText(cmd, msg) {
    if(!cmd.content) {
        console.error('Could\'t find a content property!');
        return;
    }

    msg.channel.send(cmd.content);
}

function handleEmbed(cmd, msg) {
    if(!cmd.content) {
        console.error('Could\'t find a content property!');
        return;
    }

    msg.channel.send(cmd.content);
}

function handleSound(cmd, msg) {
    if(!cmd.content) {
        console.error('Could\'t find a content property!');
        return;
    }

    if(!msg.member.voiceChannel) {
        msg.reply('you are not currently in a voice channel!');
        return;
    }

    audio.queueFile(msg.guild.id, msg.member.voiceChannel, cmd.content);
}