
const ytdl = require('ytdl-core');
const Discord = require('discord.js');
const config = require('config');

const client = new Discord.Client();

var voiceChannel;

client.on('ready', () => {
	console.log('bot is ready');
});

client.on('message', message => {
	if(message.channel.name !== 'bot_commands' || message.author.bot) {
		return;
	}

	var cmd = message.content;
	if(!cmd.startsWith('!')) {
		return;
	}

	var voiceChannel = client.channels.filter(channel => {
		return channel.type === 'voice' && channel.name === 'Stanky';
	}).first();

	voiceChannel.join()
	.then(connection => {
		const dispatcher = connection.playFile('kidlaugh.mp3');
		dispatcher.once('end', () => {
			voiceChannel.leave();
		});
		//const stream = connection.ytdl('', {filter: 'audioonly'});
	})
	.catch(console.err);
});

client.login(config.get('token'));
