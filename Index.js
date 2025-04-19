const venom = require('venom-bot');

venom
  .create()
  .then((client) => start(client))
  .catch((error) => console.log(error));

function start(client) {
  client.onMessage(async (message) => {
    const isGroup = message.isGroupMsg;

    if (!isGroup) return;

    // Mostrar regras do grupo
    if (message.body === '!regras') {
      client.sendText(message.from, '*Regras do Grupo:*\n1. Respeito\n2. Sem spam\n3. Nada de links suspeitos.');
    }

    // Mensagem de bom dia
    if (message.body === '!bomdia') {
      client.sendText(message.from, 'Bom dia, grupo!');
    }

    // Expulsar usuários mencionados com !ban
    if (message.body.startsWith('!ban')) {
      const mentioned = message.mentionedJidList;
      if (mentioned.length > 0) {
        for (let user of mentioned) {
          await client.removeParticipant(message.chatId, user);
          client.sendText(message.from, `Usuário removido: ${user}`);
        }
      } else {
        client.sendText(message.from, 'Use o comando assim: !ban @usuario');
      }
    }

    // Bloquear links
    if (message.body.includes('http')) {
      client.sendText(message.from, 'Links não são permitidos!');
    }
  });
}
