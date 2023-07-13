module.exports = async(interaction)=>{
  const { ButtonBuilder, ButtonStyle, ActionRowBuilder, Colors } = require("discord.js");
  if(!interaction.isChatInputCommand()) return;
  if(interaction.commandName === "help"){

    await interaction.reply({
      embeds:[{
        color: Colors.Green,
        title: "HELP",
        fields:[
          {
            name: "/miq",
            value: "Make it a Quoteを生成します"
          }
        ]
      }],
      components:[
        new ActionRowBuilder()
          .addComponents( 
            new ButtonBuilder()
              .setLabel("サポートサーバー")
              .setURL("https://discord.gg/NEesRdGQwD")
              .setStyle(ButtonStyle.Link))
      ]
    });
  }
}