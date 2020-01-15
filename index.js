const {Client, RichEmbed } = require('discord.js')
 
const bot = new Client()
 
const ping = require('minecraft-server-util')
 
const PREFIX = '!'

 bot.on("ready", async () => {
    console.log(`${bot.user.username} is online!!`);
    bot.user.setActivity('Minecraft')
	bot.user.setStatus('dnd')
	.then(presence => console.log(`Your Status has been set to  ${presence.game ? presence.game.none : 'none'}`))
            .catch(console.error);
});
 
bot.on('message', message =>{
 
    let args = message.content.substring(PREFIX.length).split(' ')
 
    switch(args[0]){
        case 'mc':
 
            if(!args[1]) return message.channel.send('You must type a minecraft server ip')
            if(!args[2]) return message.channel.send('You must type a minecraft server port(foloseste port-ul 25565)')
 
            ping(args[1], parseInt(args[2]), (error, reponse) =>{
                if(error) throw error
                const Embed = new RichEmbed()
				.setColor("RANDOM")
                .setTitle('𝐒𝐞𝐫𝐯𝐞𝐫 𝐒𝐭𝐚𝐭𝐮𝐬')
                .addField('𝙎𝙚𝙧𝙫𝙚𝙧 𝙞𝙥', reponse.host)
                .addField('𝙎𝙚𝙧𝙫𝙚𝙧 𝙑𝙚𝙧𝙨𝙞𝙤𝙣', reponse.version)
                .addField('𝙊𝙣𝙡𝙞𝙣𝙚 𝙋𝙡𝙖𝙮𝙚𝙧𝙨', reponse.onlinePlayers)
                .addField('𝙈𝙖𝙭 𝙋𝙡𝙖𝙮𝙚𝙧𝙨', reponse.maxPlayers)
               
                message.channel.send(Embed)
            })
        break
 
    }
 
})

 
bot.login(process.env.token)
