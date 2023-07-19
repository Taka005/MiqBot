module.exports = async(message)=>{
  const { ButtonBuilder, ActionRowBuilder, ButtonStyle, AttachmentBuilder, Colors } = require("discord.js");
  const gen = require("../lib/gen");
  const fetchReference = require("../lib/fetchReference");
  const types = require("../lib/types");
  if(message.content.startsWith("<@933484535461593198>")){

    const reply = await fetchReference(message);
    if(!reply?.cleanContent) return;

    const type = message.content.substring(21).trim();
    if(
      type.length > 0&&
      !types.includes(type)
    ) return await message.reply({
      embeds:[{
        author:{
          name: "生成タイプが無効です",
          icon_url: "https://cdn.taka.ml/images/system/error.png"
        },
        color: Colors.Red,
        description: "`normal`,`color`,`reverse`,`white`,`reverseColor`,`reverseWhite`\nを指定する必要があります"
      }]
    }).catch(()=>{});

    const msg = await message.reply("生成中...")
      .catch(()=>{});

    const image = await gen(
      type,
      reply.author.username,
      reply.author.id,
      reply.cleanContent.replace("#","＃"),
      reply.author.avatarURL({extension:"png",size:1024})||reply.author.defaultAvatarURL
    );

    await msg.edit({
      content: "",
      files:[
        new AttachmentBuilder()
          .setFile(image.stream())
          .setName(`MIQ_${reply.id}.png`)
      ],
      components:[
        new ActionRowBuilder()
          .addComponents(
            new ButtonBuilder()
              .setCustomId(`change_color_${message.author.id}`)
              .setStyle(ButtonStyle.Secondary)
              .setEmoji("1131187775937458216"),
            new ButtonBuilder()
              .setCustomId(`change_reverse_${message.author.id}`)
              .setStyle(ButtonStyle.Secondary)
              .setEmoji("1131189335379689482"),
            new ButtonBuilder()
              .setCustomId(`change_white_${message.author.id}`)
              .setStyle(ButtonStyle.Secondary)
              .setEmoji("1131189576841560115"),
            new ButtonBuilder()
              .setCustomId(`change_reverseColor_${message.author.id}`)
              .setStyle(ButtonStyle.Secondary)
              .setEmoji("1131191439666196531"),
            new ButtonBuilder()
              .setCustomId(`change_reverseWhite_${message.author.id}`)
              .setStyle(ButtonStyle.Secondary)
              .setEmoji("1131190834843353158")),
        new ActionRowBuilder()
          .addComponents(
            new ButtonBuilder()
              .setCustomId(`change_normal_${message.author.id}`)
              .setStyle(ButtonStyle.Secondary)
              .setLabel("リセット"),
            new ButtonBuilder()
              .setCustomId(`delete_${message.author.id}`)
              .setStyle(ButtonStyle.Danger)
              .setLabel("メッセージを削除")
              .setEmoji("1131188900392603688"))
      ]
    }).catch(()=>{});
  }
}