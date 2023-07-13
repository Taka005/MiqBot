module.exports = async(client)=>{
  const { Events, ButtonBuilder, ActionRowBuilder, ButtonStyle, Colors } = require("discord.js");
  const fs = require("fs");
  require("dotenv");

  const slashcommand = fs.readdirSync("./module/slashcommand")
    .map(file=>require(`./slashcommand/${file}`));

  const contextmenu = fs.readdirSync("./module/contextmenu")
    .map(file=>require(`./contextmenu/${file}`));

  client.once(Events.ClientReady,async(client)=>{
    require("./event/status")(client);
    require("./event/command")(client);
  });

  client.on(Events.MessageCreate,async(message)=>{
    if(
      !message.guild.members.me||
      !message.channel.viewable
    ) return;
    
    if(message.author.bot) return;  

    console.log(`\x1b[37mMESSAGE: ${message.author.tag}(${message.guild.id})${message.content}\x1b[39m`);

    require("./command/exec")(message);
    require("./command/miq")(message);
  });

  client.on(Events.GuildCreate,async(guild)=>{
    require("./event/add")(guild);
  });

  client.on(Events.InteractionCreate,async(interaction)=>{
    if(!interaction.guild) return await interaction.reply({ 
      embeds:[{
        author:{
          name: "コマンドが実行できません",
          icon_url: "https://cdn.taka.ml/images/system/error.png"
        },
        color: Colors.Red,
        description: "BOTの操作はDMで実行することができません\nサーバー内で実行してください"
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

    Promise.all(slashcommand.map(fn=>fn(interaction)));
    Promise.all(contextmenu.map(fn=>fn(interaction)));
    
    require("./event/delete")(interaction);
    require("./event/change")(interaction);
  });

  if(process.env.DEBUG){
    client.on(Events.Debug,(message)=>{
      console.log(`Debug: ${message}`);
    });

    client.on(Events.Warn,(message)=>{
      console.log(`Warn: ${message}`);
    });

    client.on(Events.Error,(error)=>{
      console.log(`Error: ${error}`);
    });
  }
}