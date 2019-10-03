const { RichEmbed } = require("discord.js");
const { getCommandStatus } = require("../../functions.js")

module.exports = {
    name: "tot",
    aliases: ["thisorthat", "wyr", "wouldyourather"],
    category: "tot",
    description: "This Or That Command",
    usage: prefix + "tot",
    run: (client, message) => {
        getCommandStatus(message, "tot").then(function (res) {
            if (res === false) message.reply("Command disabled").then(m => m.delete(5000))
            if (res === true) {
                if (message.member.hasPermission("ADMINISTRATOR"))
                    tot(client, message);
            }
        });
    }
}
async function tot(client, message) {
    awaitFirstChoice(message)
    async function awaitFirstChoice(message) {
        message.reply(" First Choice? This will expire in 30 seconds...").then(r => r.delete(10000))

        const filter = m => m.author.id === message.author.id;

        message.channel.awaitMessages(filter, { max: 1, time: 30000 }).then(collected => {
            if (collected.first()) {
                if (collected.first().content === "cancel" || collected.first().content.startsWith(prefix)) {
                    return message.reply("Cancelled").then(r => r.delete(10000))
                } else {
                    const firstChoice = collected.first().content

                    collected.first().delete()

                    awaitSecondChoice(message, firstChoice);
                }
            } else return message.reply("Expired").then(r => r.delete(7500))
        }).catch(err => console.log(err))
    }

    async function awaitSecondChoice(message, firstChoice) {
        message.reply(" Second Choice? This will expire in 30 seconds...").then(r => r.delete(10000))

        const filter = m => m.author.id === message.author.id;

        message.channel.awaitMessages(filter, { max: 1, time: 30000 }).then(collected => {
            if (collected.first()) {
                if (collected.first().content === "cancel" || collected.first().content.startsWith(prefix)) {
                    return message.reply("Cancelled").then(r => r.delete(10000))
                } else {
                    const secondChoice = collected.first().content

                    collected.first().delete()

                    awaitImage(message, firstChoice, secondChoice);
                }
            } else return message.reply("Expired").then(r => r.delete(10000))
        }).catch(err => console.log(err))
    }

    async function awaitImage(message, firstChoice, secondChoice) {
        message.reply(" What image? This will expire in 30 seconds...").then(r => r.delete(10000))

        const filter = m => m.author.id === message.author.id;

        message.channel.awaitMessages(filter, { max: 1, time: 30000 }).then(collected => {
            if (collected.first()) {
                if (collected.first().content === "cancel" || collected.first().content.startsWith(prefix)) {
                    return message.reply("Cancelled").then(r => r.delete(10000))
                } else {
                    const attachment = collected.first().attachments.map((attachment) => { return attachment.url })
                    if (attachment.length !== 0) {
                        const image = attachment[0]

                        collected.first().delete(10000)

                        embedMessage(message, firstChoice, secondChoice, image)
                    } else return message.reply("Please add an image")
                }
            } else return message.reply("Expired").then(r => r.delete(10000))
        }).catch(err => console.log(err))
    }

    function embedMessage(message, firstChoice, secondChoice, image) {
        if (message.deletable) message.delete();
        const embed = new RichEmbed()
            .setColor('#ffff00')
            .setTitle('This or That')
            .setImage(image)
            .setDescription(firstChoice + " or " + secondChoice)

        client.channels.get('629022897893015602').send(embed).then(function (msg) {
            msg.react("⬅").then(() => msg.react("➡")).catch(err => console.log(err))
        }).catch(err => console.log(err))
    }
}