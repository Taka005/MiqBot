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
      message.cleanContent,
      message.author.avatarURL({extension:"png",size:1024})||message.author.defaultAvatarURL
    );

    await interaction.editReply({ 
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
              .setCustomId(`delete_${interaction.user.id}`)
              .setStyle(ButtonStyle.Secondary)
              .setLabel("メッセージを削除"))
      ]
    }); 
  }
}