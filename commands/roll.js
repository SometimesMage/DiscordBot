const emitter = require('./index').emitter;

emitter.on('command', (cmd, msg) => {
    if(cmd !== 'roll') {
        return;
    }

    let max = 100;
    let times = 1;
    let total = 0;

    if(msg.content.split(' ').length > 1) {
        let num = parseInt(msg.content.split(' ')[1]);
        let num2 = parseInt(msg.content.split(' ')[2]);

        if(!isNaN(num) && num >= 1 ) {
            max = Math.floor(num);

            if(!isNaN(num2) && num2 >= 1) {
                times = Math.floor(num);
                max = Math.floor(num2);
            }
        }
    }

    let result = Math.floor(Math.random() * max) + 1
    total = result;

    for(i = 1; i < times; i++) {
        let random = Math.floor(Math.random() * max) + 1
        result += ', ' + random;
        total += random;
    }

    if(times > 1) {
        msg.reply(`you rolled a ${result} for a total of ${total}!`);
    } else {
        msg.reply(`you rolled a ${result}!`);
    }
});