const Discord = require('discord.js');
const client = new Discord.Client();
const dotenv = require('dotenv');
dotenv.config();

let entrada;

client.on('ready', () => {
  console.log(`Bot conectado como ${client.user.tag}`);
});

client.on('message', message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(process.env.PREFIX)) return;

  const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'entrada') {
    if (entrada) {
      message.channel.send(':warning: Você já marcou a entrada!');
      return;
    }
    entrada = new Date();
    message.react('🟢'); //marca a entrada
  } else if (command === 'saida') {
    message.react('🔴');
    if (!entrada) {
      message.channel.send(':warning: Você ainda não marcou a entrada!');
      return;
    }
    const agora = new Date();
    const diff = agora - entrada;
    const minutos = Math.floor(diff / 1000 / 60);
    // converter em horas
    const horas = Math.floor(minutos / 60);

    const embed = new Discord.MessageEmbed()
      .setColor('#00ff00')
      .setTitle(`Tempo no servidor **${horas}** Horas 🕗`)
      .setDescription(`Você entrou em **${entrada.toLocaleString()}** :inbox_tray: e saiu em **${agora.toLocaleString()}** :outbox_tray:\n\nVocê ficou **${minutos} minutos** no servidor.`)
      .setFooter('Bot criado por Ypek#7777');

    message.channel.send(embed);
    entrada = null;
  }
});

client.login(process.env.TOKEN);
