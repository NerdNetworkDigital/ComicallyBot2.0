const { del } = require("../../functions.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "smp",
    aliases: ["shitmypants"],
    category: "fun",
    description: "Sends a message explaining smp.",
    permissions: "member",
    run: (client, message, args) => {
        const embed = new MessageEmbed()
            .addField('**SMP explaination:**', `**SMP**, is a commonly used acronym by ComicallyBad.
            **SMP**, standing for "**Shit my pants**", is often used in the context of; "I am going to **SMP**"`)
            .setTimestamp();

        return message.channel.send(embed).then(m => del(m, 15000));
    }
}