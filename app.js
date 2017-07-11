const Discord = require('discord.js');
const client = new Discord.Client();
const readline = require('readline');
const config = require('./config');
const commands = require('./commands').emitter;

client.on('ready', () => {
    console.log('Ready!');
    client.user.setGame('Casting Spells!');
});

client.on('message', msg => {
    if(msg.channel instanceof Discord.DMChannel || msg.channel instanceof Discord.GroupDMChannel) {
        console.log('Private message recieved and ignored!');
        return;
    }

    if(msg.content.startsWith(config.command.prefix)) {
        let cmd = msg.content.split(" ")[0];
        cmd = cmd.substr(1, cmd.length);
        commands.emit('command', cmd, msg);
    }
});

client.login(config.client.token);

module.exports = client;

//Console Input Handling

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', (input) => {
    if(input === 'quit') {
        client.destroy();
        process.exit();
    }
});