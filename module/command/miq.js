module.exports = async(message)=>{
  const fetch = require("node-fetch");
  const { ButtonBuilder, ActionRowBuilder, ButtonStyle, AttachmentBuilder } = require("discord.js");
  const gen = require("../lib/gen");
  if(message.content === "<@933484535461593198>"){

    try{
      const reply = await message.fetchReference();
      if(!reply?.cleanContent) return;

      const image = await gen(
        "normal",
        message.author.username,
        message.author.id,
        message.cleanContent,
        message.author.avatarURL({extension:"png",size:1024})||message.author.defaultAvatarURL
      );

      await message.reply({
        content: `[生成元](https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id})`,
        files:[
          new AttachmentBuilder()
            .setFile(image.stream())
            .setName("Make_it_a_Quote.png")
        ],
        components:[
          new ActionRowBuilder()
            .addComponents(
              new ButtonBuilder()
                .setCustomId(`delete_${message.author.id}`)
                .setStyle(ButtonStyle.Secondary)
                .setLabel("メッセージを削除"))
        ]
      });
    }catch{}
  }
}