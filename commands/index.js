const Discord = require('discord.js');
const events = require('events');
const commandPrefix = require('../config').command.prefix;
const commandEmitter = new events.EventEmitter();

commandEmitter.on('command', (cmd, msg) => {
    let name = msg.member.nickname ? msg.member.nickname : msg.member.user.username;
    console.log(`[${msg.guild.name}] ${name} issued ${commandPrefix}${cmd} command.`);
});

module.exports.emitter = commandEmitter;

const noralizedPath = require('path').resolve(__dirname);

require('fs').readdirSync(noralizedPath).forEach(file => {
    if(file === 'index.js')
        return;
    require(__dirname + '\\' + file);
});