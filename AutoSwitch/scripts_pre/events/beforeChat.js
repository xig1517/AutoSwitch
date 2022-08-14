import { world } from "mojang-minecraft";
import { commandHandler } from "../commands/_handler";

const toPlayer = (player, message) => player.runCommand(`tellraw @s {"rawtext":[{"text":"${message}"}]}`)
const help =
    [
        '> -- AutoSwitch --',
        '> !as help --- Get help about AutoSwitch',
        '> !as setting --- Open setting page',
        '> ---',
    ]

export const beforeChat = () => {

    world.events.beforeChat.subscribe(ev => {
        const [sender, message] = [ev.sender, ev.message];

        if (!message.startsWith('!')) return;

        ev.cancel = true;
        try { commandHandler(sender, message) }
        catch (e) {
            toPlayer(sender, e);
            help.forEach(msg => toPlayer(sender, msg))
        }
    })

}