module.exports = async(client)=>{
  require("dotenv").config();
  const { SlashCommandBuilder, ContextMenuCommandBuilder, ApplicationCommandType, REST, Routes } = require("discord.js");
  const config = require("../../config.json");

  const rest = new REST({version:"10"})
    .setToken(process.env.BOT_TOKEN);
            
  await rest.put(
    Routes.applicationCommands(client.application.id),
      { 
        body: [
          //Slashcommand
          //help
          new SlashCommandBuilder()
            .setName("help")
            .setDescription("View how to use")
            .setDescriptionLocalization("ja","使い方を表示します")
            .addStringOption(option =>
              option
                .setName("command")
                .setDescription("Command name to view")
                .setDescriptionLocalization("ja","表示するコマンド名")),
          //miq
          new SlashCommandBuilder()
            .setName("miq")
            .setDescription("Generate Make it a Quote")
            .setDescriptionLocalization("ja","Make it a Quoteを生成します")
            .addStringOption(option =>
              option
                .setName("type")
                .setDescription("Type")
                .setDescriptionLocalization("ja","生成する種類")
                .setRequired(true)
                .addChoices(
                  { name: "標準", value: "normal" },
                  { name: "カラー", value: "color" },
                  { name: "位置反転", value: "reverse" },
                  { name: "色反転", value: "white" },
                  { name: "位置反転・カラー", value: "reverseColor"},
                  { name: "位置反転・色反転", value: "reverseWhite" }
            ))
            .addStringOption(option =>
              option
                .setName("text")
                .setDescription("Text to view")
                .setDescriptionLocalization("ja","表示するテキスト")
                .setRequired(true)),
          //ContextMenu
          //quote
          new ContextMenuCommandBuilder()
            .setName("Make it a Quote")
            .setType(ApplicationCommandType.Message)
        ]
      }
  );

  await client.channels.cache.get(config.log).send("スラッシュコマンドをリロードしました");
}