const Discord = require('discord.js');
const { prefix, token, giphyKey } = require('./config.json');
const client = new Discord.Client();

/*boot up bot*/
client.once('ready', () => {
    console.log('Ready!')
})

var GphApiClient = require('giphy-js-sdk-core')
giphy = GphApiClient(giphyKey)

client.on('message', message => {
    /*admin permissions*/
    if (message.member.hasPermission(['KICK_MEMBERS', 'BAN_MEMBERS'])) {

        //kick command//
        if (message.content.startsWith(`${prefix}kick`)) {
            let member = message.mentions.members.first();
            member.kick().then((member) => {
                message.channel.send(":wave: " + member.displayName + " has been kicked!")
            })
        }
    }
    /*gif command*/
    if (message.content.startsWith(`${prefix}gif`)) {
        /*substring 5 to account for space after command*/
        giphy.search('gifs', { "q": message.content.substring(5) }).then((response) => {
            var totalResponses = response.data.length;
            var responseIndex = Math.floor((Math.random() * 100) + 1) % totalResponses;
            var finalResponse = response.data[responseIndex];

            /*show randomly selected gif*/
            message.channel.send("", { files: [finalResponse.images.fixed_height.url] })
        }).catch(() => {
            message.channel.send("Error finding gif...");
        })
    }
})

client.login(token);