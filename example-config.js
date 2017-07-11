var config = {};

config.client = {};
config.command = {};
config.commands = {};


//Client
config.client.token = 'Your Bot Token Here';

//Command
config.command.prefix = '!';
config.command.soundFolder = 'D:/Code/DiscordBot/sounds/'
config.command.tauntFolder = 'D:/Code/DiscordBot/taunts/'

//Simple Custom Commands
config.commands.ping = {
    type: 'reply',
    content: 'pong!'
}

config.commands.pong = {
    type: 'reply',
    content: 'ping!'
}

config.commands.merica = {
    type: 'sound',
    content: 'fuck-yeah.wav'
}

module.exports = config;