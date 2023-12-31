module.exports = async(interaction)=>{
  const { ButtonBuilder, ActionRowBuilder, ButtonStyle, AttachmentBuilder, Colors } = require("discord.js");
  const gen = require("../lib/gen");
  if(!interaction.isContextMenuCommand()) return;
  if(interaction.commandName === "Make it a Quote"){
    const message = interaction.options.getMessage("message");
    
    if(!message.cleanContent) return await interaction.reply({
      embeds:[{
        author:{
          name: "生成できませんでした",
          icon_url: "https://cdn.taka.ml/images/system/error.png"
        },
        color: Colors.Red,
        description: "メッセージの内容が存在しません"
      }],
      ephemeral: true
    });

    await interaction.deferReply();
    await interaction.editReply("生成中...");

    const image = await gen(
      "normal",
      message.author.username,
      message.author.id,
      message.cleanContent.replace("#","＃"),
      message.author.avatarURL({extension:"png",size:1024})||message.author.defaultAvatarURL
    );

    await interaction.editReply({ 
      content: `[生成元](https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id})`,
      files:[
        new AttachmentBuilder()
          .setFile(image.stream())
          .setName(`MIQ_${message.id}.png`)
      ],
      components:[
        new ActionRowBuilder()
          .addComponents(
            new ButtonBuilder()
              .setCustomId(`change_color_${interaction.user.id}`)
              .setStyle(ButtonStyle.Secondary)
              .setEmoji("1131187775937458216"),
            new ButtonBuilder()
              .setCustomId(`change_reverse_${interaction.user.id}`)
              .setStyle(ButtonStyle.Secondary)
              .setEmoji("1131189335379689482"),
            new ButtonBuilder()
              .setCustomId(`change_white_${interaction.user.id}`)
              .setStyle(ButtonStyle.Secondary)
              .setEmoji("1131189576841560115"),
            new ButtonBuilder()
              .setCustomId(`change_reverseColor_${interaction.user.id}`)
              .setStyle(ButtonStyle.Secondary)
              .setEmoji("1131191439666196531"),
            new ButtonBuilder()
              .setCustomId(`change_reverseWhite_${interaction.user.id}`)
              .setStyle(ButtonStyle.Secondary)
              .setEmoji("1131190834843353158")),
        new ActionRowBuilder()
          .addComponents(
            new ButtonBuilder()
              .setCustomId(`change_normal_${interaction.user.id}`)
              .setStyle(ButtonStyle.Secondary)
              .setLabel("リセット"),
            new ButtonBuilder()
              .setCustomId(`delete_${interaction.user.id}`)
              .setStyle(ButtonStyle.Danger)
              .setLabel("メッセージを削除"))
      ]
    }); 
  }
}