const Discord = require('discord.js');

const emitter = require('./').emitter;

const minuteInMillis = 1000 * 60;
const hourInMillis = 60 * minuteInMillis;
const dayInMillis = 24 * hourInMillis;

function formatDate(date) {
    let weekDays = ['Sun', 'Mon', 'Tues', "Wed", "Thrus", "Fri", "Sat"]
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    
    return weekDays[date.getDay()] + ' ' + months[date.getMonth()] + ' ' + date.getDate() + ' ' + date.getFullYear();
}

emitter.on('command', (cmd, msg) => {
    if(cmd !== 'userinfo') {
        return;
    }

    //Find Member to look up

    let member = msg.member;

    if(msg.content.split(' ').length > 1) {
        let name = msg.content.split(' ').reduce((res, val, ind) => {
            if(ind == 0) {
                return '';
            }

            if(res === '') {
                return res + val;
            }

            return res + ' ' + val;
        }, '');

        if(msg.guild.members.find(mem => mem.user.username === name)) {
            member = msg.guild.members.find(mem => mem.user.username === name);
        } else if(msg.guild.members.exists('nickname', name)) {
            member = msg.guild.members.find('nickname', name);
        }
    }

    //Format Message

    let color = 0x19d379;
    let thumbnail = member.user.avatarURL ? member.user.avatarURL : member.user.defaultAvatarURL;
    let footer = msg.client.user.username;
    let footerThumbnail = msg.client.user.avatarURL ? msg.client.user.avatarURL : msg.client.user.defaultAvatarURL;
    let username = member.nickname ? member.nickname : member.user.username;
    let gameTitle = 'Playing:';
    let game = 'Not playing a game.';
    let status = member.presence.status;
    let daysSinceJoining = Math.floor((Date.now() - member.joinedTimestamp) / dayInMillis);
    let daysSinceCreation = Math.floor((Date.now() - member.user.createdTimestamp) / dayInMillis);

    let roles = member.roles.reduce((res, val) => {
        if(!res)
            return res + val.name;

        return res + ', ' + val.name;
    }, '');

    if(member.presence.game) {
        if(member.presence.game.streaming) {
            gameTitle = 'Streaming:';
            game = `[${member.presence.game.name}](${member.presence.game.url})`;
        } else {
            game = member.presence.game.name;
        }
    }

    let embed = new Discord.RichEmbed()
        .setColor(color)
        .setThumbnail(thumbnail)
        .setFooter(footer, footerThumbnail)
        .setTimestamp()
        .addField('User:', username, true)
        .addField(gameTitle, game, true)
        .addField('Status:', status, true)
        .addField('Days Since Joining:', daysSinceJoining, true)
        .addField('Join Date:', formatDate(member.joinedAt), true)
        .addField('Days Since Creation:', daysSinceCreation, true)
        .addField('Account Created:', formatDate(member.user.createdAt))
        .addField('Roles:', roles);

    msg.channel.send({embed});
});