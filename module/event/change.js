module.exports = async(interaction)=>{
  const { AttachmentBuilder, Colors } = require("discord.js");
  const gen = require("../lib/gen");
  const fetchMessage = require("../lib/fetchMessage");
  if(!interaction.isButton()) return;
  if(interaction.customId.startsWith("change_")){
    const data = interaction.customId.split("_");
    
    if(interaction.user.id !== data[2]) return await interaction.reply({
      embeds:[{
        color: Colors.Red,
        author:{
          name: "編集できませんでした",
          icon_url: "https://cdn.taka.ml/images/system/error.png"
        },
        description: "作成者のみが操作可能です"
      }],
      ephemeral: true
    });
  
    const msg = await fetchMessage(interaction.channel,interaction.message.attachments.first().name.match(/\d{17,19}/g)[0]);
    if(!msg) return await interaction.reply({
      embeds:[{
        color: Colors.Red,
        author:{
          name: "編集に失敗しました",
          icon_url: "https://cdn.taka.ml/images/system/error.png"
        },
        description: "BOTの権限が不足している可能性があります"
      }],
      ephemeral: true
    });

    interaction.deferUpdate({});

    const image = await gen(
      data[1],
      msg.author.username,
      msg.author.id,
      msg.cleanContent.replace("#","＃"),
      msg.author.avatarURL({extension:"png",size:1024})||msg.author.defaultAvatarURL
    );

    await interaction.message.edit({
      files:[
        new AttachmentBuilder()
          .setFile(image.stream())
          .setName(`MIQ_${msg.id}.png`)
      ]
    }).catch(()=>{});
    }
  }