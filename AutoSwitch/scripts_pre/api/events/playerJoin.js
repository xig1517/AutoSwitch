import { world } from "mojang-minecraft"
import { default_setting_property } from "../dynamicProperty/info/_setting";

export const playerJoin = () => {

    world.events.playerJoin.subscribe(ev => {
        const player = ev.player;

        for (const type in default_setting_property)
            for (const [identifier, value] of Object.entries(default_setting_property[type]))
                if (player.getDynamicProperty(`${type}:${identifier}`) === undefined) player.setDynamicProperty(`${type}:${identifier}`, value);
    })

}