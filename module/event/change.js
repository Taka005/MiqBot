module.exports = async(interaction)=>{
  const { ButtonBuilder, ActionRowBuilder, ButtonStyle, AttachmentBuilder, Colors } = require("discord.js");
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
    console.log(interaction.message.attachments.first().name)
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
      ],
      components:[
        new ActionRowBuilder()
          .addComponents(
            new ButtonBuilder()
              .setCustomId(`change_color_${interaction.user.id}`)
              .setStyle(ButtonStyle.Secondary)
              .setEmoji("1129319552648495154"),
            new ButtonBuilder()
              .setCustomId(`change_reverse_${interaction.user.id}`)
              .setStyle(ButtonStyle.Secondary)
              .setEmoji("1129319479969599598"),
            new ButtonBuilder()
              .setCustomId(`change_white_${interaction.user.id}`)
              .setStyle(ButtonStyle.Secondary)
              .setEmoji("1129319434452996167")),
        new ActionRowBuilder()
          .addComponents(
            new ButtonBuilder()
              .setCustomId(`delete_${interaction.user.id}`)
              .setStyle(ButtonStyle.Secondary)
              .setLabel("メッセージを削除")
              .setEmoji("1129319348264255518"))
      ]
    })
      .then(async()=>{
        await interaction.deferUpdate({});
      })
      .catch(async()=>{
        await interaction.reply({
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
      });
    }
  }