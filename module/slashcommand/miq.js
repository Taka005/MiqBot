module.exports = async(interaction)=>{
  const { Colors, AttachmentBuilder } = require("discord.js");
  const gen = require("../lib/gen");
  if(!interaction.isChatInputCommand()) return;
  if(interaction.commandName === "miq"){
    const type = interaction.options.getString("type");
    const text = interaction.options.getString("text");
  
    await interaction.deferReply();
    try{
      const image = await gen(
        type,
        interaction.user.username,
        interaction.user.id,
        text.replace("#","＃"),
        interaction.user.avatarURL({extension:"png",size:1024})||interaction.user.defaultAvatarURL
      );
  
      await interaction.editReply({
        files:[
          new AttachmentBuilder()
            .setFile(image.stream())
            .setName("MIQ.png")
        ]
      });
    }catch{
      await interaction.editReply({
        embeds:[{
          color: Colors.Red,
          author:{
            name: "生成できませんでした",
            icon_url: "https://cdn.taka.ml/images/system/error.png"
          },
          description: "テキストを変えてやり直してください"
        }]
      });
    }
  }
}