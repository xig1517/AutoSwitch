/*------------------------[command]----------------------- */
import { setting } from './setting.js';
/*-------------------------------------------------------- */

const commands = { // 指令集
    'setting': setting
}

export const commandHandler = (sender, message) => {

    const args = message.split(/\s+/); // 切割空格
    if (args[0] !== '!as') throw ``;

    args.shift();
    const cmd = args[0];// 取得指令名
    if (cmd === undefined) throw `Please type a command behind !as`
    if (!(cmd in commands)) throw `Cannot find command: ${cmd}`;

    commands[cmd](sender, args);
}