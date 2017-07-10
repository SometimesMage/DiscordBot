var config = {};

config.client = {};
config.command = {};
config.commands = {};


//Client
config.client.token = 'Your Bot Token Here';

//Command
config.command.prefix = '!';

//Simple Custom Commands
config.commands.ping = {
    type: 'reply',
    content: 'pong!'
}

config.commands.pong = {
    type: 'reply',
    content: 'ping!'
}

module.exports = config;