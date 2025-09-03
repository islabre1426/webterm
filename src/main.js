const command = {
    help: {
        help: 'Print this message',
        output: null,
        onExec: function(parent) {
            const pre = document.createElement('pre');
            pre.textContent = 'Available commands:\n'

            Object.keys(command).forEach((key) => {
                pre.textContent += `\t${key}\t${command[key].help}\n`;
            });

            parent.appendChild(pre);
        },
    },
    clear: {
        help: 'Clear the terminal',
        output: null,
        onExec: function(parent) {
            parent.innerHTML = '';
        },
    },
    about: {
        help: 'About this website',
        output: `\
This is WebTerm, a terminal emulator on the web. It's purely a fun project inspired from https://sudoker0.xyz/classic-project/MSDOS.html.
Also, terminal is cool. You should learn how to use it.`,
        onExec: null,
    },
    ls: {
        help: "List current working directory (not working!)",
        output: `Nothing to see here ;>`,
        onExec: null,
    },
    source: {
        help: 'See the source code',
        output: null,
        onExec: function(parent) {
            window.open('https://gitlab.com/islabre1426/webterm');
        },
    },
    bigrat: {
        help: 'A picture of a big rat',
        output: null,
        onExec: function(parent) {
            window.open('https://bigrat.monster/');
        },
    },
    meow: {
        help: 'Meow',
        output: 'Meow',
        onExec: null,
    },
};

const terminalContent = document.querySelector('.terminal-content');

function handleCommand(input, parent) {
    if (Object.hasOwn(command, input)) {
        if (input !== null) {
            const pre = document.createElement('pre');
            pre.textContent = command[input].output;

            parent.appendChild(pre);
        };

        if (command[input].onExec !== null) {
            command[input].onExec(parent);
        };
    } else {
        parent.innerHTML += `${input}: command not found`;
    };
};

function createPrompt(parent) {
    const prompt = document.createElement('div');
    prompt.classList.add('prompt');

    const promptString = document.createElement('span');
    promptString.classList.add('prompt-string');
    promptString.textContent = '~$';

    const promptInput = document.createElement('input');
    promptInput.type = 'text';
    promptInput.name = 'prompt-input';
    promptInput.id = 'prompt-input';

    promptInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const promptParent = document.querySelector('.prompt');
            const inputPlaceholder = document.createElement('span');

            const inputValue = promptInput.value

            promptParent.classList.remove('prompt');
            promptParent.classList.add('prompt-previous');
            inputPlaceholder.textContent = inputValue;

            promptParent.removeChild(promptInput);
            promptParent.appendChild(inputPlaceholder);
            
            handleCommand(inputValue, parent);

            createPrompt(parent);
        };
    });

    prompt.appendChild(promptString);
    prompt.appendChild(promptInput);

    parent.appendChild(prompt);

    promptInput.focus();
};

createPrompt(terminalContent);

const promptInput = document.getElementById('prompt-input');

document.addEventListener('click', () => {
    document.getElementById('prompt-input').focus();
});