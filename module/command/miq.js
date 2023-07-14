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
      types.includes(type)
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
    }).catch(()=>{});
  }
}