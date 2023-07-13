module.exports = async(message)=>{
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
        message.cleanContent.replace("#","＃"),
        message.author.avatarURL({extension:"png",size:1024})||message.author.defaultAvatarURL
      );

      await message.reply({
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
    }catch{
      
    }
  }
}