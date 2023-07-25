const Discord = require('discord.js-selfbot-v13');
const client = new Discord.Client({
  readyStatus: false,
  checkUpdate: false
});

const keepAlive = require('./server.js');
keepAlive();

function formatTime() { //Credits to elezthemdev and elezthemdev
  const date = new Date();
  const options = {
    timeZone: 'America/New_York', //https://www.zeitverschiebung.net/en/ and find your city and enter here
    hour12: true,
    hour: 'numeric',
    minute: 'numeric'
  };
  return new Intl.DateTimeFormat('en-US', options).format(date);
}

client.on('ready', async () => {
  console.clear();
  console.log(`${client.user.tag} - rich presence started!`);

  const r = new Discord.RichPresence()
    .setApplicationId('you application id')
    .setType('STREAMING')
    .setURL('https://www.twitch.tv/elezthem0001') //Must be a youtube video link 
    .setState('Заключай Взаимки/J4J')
    .setName('elezthem0001')
    .setDetails(`Лучший сервер для ВЗ/J4J [${formatTime()}]`)
    .setStartTimestamp(Date.now())
    .setAssetsLargeImage('https://cdn.discordapp.com/attachments/1077635097756442624/1133410185755512903/ec2eee8e81a4c02fa03dec22e5e70477.jpg') //You can put links in tenor or discord and etc.
    .setAssetsLargeText('Заключай/Ищи Взаимки/Партнерки/Персонал') //Text when you hover the Large image
    .setAssetsSmallImage('https://cdn.discordapp.com/attachments/1077635097756442624/1133337049928310794/cac996ec02cecdb7.png') //You can put links in tenor or discord and etc.
    .setAssetsSmallText('Мой Крутой Сервер! | My Cool Server!') //Text when you hover the Small image
    .addButton('Join Discord', 'https://discord.gg/vzaimnyi-vkhod-na-server-1067554815690952835')
    .addButton('My site', 'https://elezthemdev.w3spaces.com/');

  client.user.setActivity(r);
  client.user.setPresence({ status: "dnd" }); //dnd, online, idle, offline

  let prevTime = null;
  setInterval(() => {
    const newTime = formatTime();
    if (newTime !== prevTime) {
      const newDetails = `Взаимный Вход на Сервер | JOIN FOR JOIN [${newTime}]`;
      r.setDetails(newDetails);
      client.user.setActivity(r);
      prevTime = newTime;
    }
  }, 1000); // Update every second
});

const mySecret = process.env['you discord acc token'];
client.login(mySecret);
