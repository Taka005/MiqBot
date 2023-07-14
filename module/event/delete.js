module.exports = async(interaction)=>{
  const { Colors, PermissionFlagsBits } = require("discord.js");
  if(!interaction.isButton()) return;
  if(interaction.customId.startsWith("delete_")){
    const id = interaction.customId.split("_")[1];
  
    if(
      interaction.user.id !== id&&
      !interaction.member.permissions.has(PermissionFlagsBits.ManageMessages)
    ) return await interaction.reply({
      embeds:[{
        color: Colors.Red,
        author:{
          name: "削除できませんでした",
          icon_url: "https://cdn.taka.ml/images/system/error.png"
        },
        description: "作成者または`メッセージを管理`の権限のある人のみが操作可能です"
      }],
      ephemeral: true
    });
  
    await interaction.message.edit({
      content: `[**${interaction.user.tag}**により削除]`,
      components: [],
      files: []
    })
      .then(async()=>{
        await interaction.deferUpdate({});
      })
      .catch(async()=>{
        await interaction.reply({
          embeds:[{
            color: Colors.Red,
            author:{
              name: "削除に失敗しました",
              icon_url: "https://cdn.taka.ml/images/system/error.png"
            },
            description: "BOTの権限が不足している可能性があります",
          }],
          ephemeral: true
        })
      });
  }
}