function attachEvents() {
    document.getElementById('submit').addEventListener('click', async () => {
        const author = document.getElementById('author').value;
        const content = document.getElementById('content').value;
        if(author && content) {
            await sendMessage({ author, content });
        }
        document.getElementById('author').value = '';
        document.getElementById('content').value = '';
        // getMessages();- презарежда автоматично полето със съобщенията
    });
    document.getElementById('refresh').addEventListener('click', getMessages);

    getMessages();

}

attachEvents();

async function getMessages() {
    const responce = await fetch('http://localhost:3030/jsonstore/messenger');
    const data = await responce.json();

    const messages = Object.values(data.messenger).map(v => `${v.author}: ${v.content}`).join('\n');
    document.getElementById('messages').value = messages;

}

async function sendMessage(message) {

    const responce = await fetch('http://localhost:3030/jsonstore/messenger/messenger', {
        method: 'post',
        headers: { 'Content-Type': 'aplication/json' },
        body: JSON.stringify(message)
    });
    const data = await responce.json();

}

