import { Player } from "mojang-minecraft";
import { default_setting_property } from "./info/_setting";

/**
 * @param {Player} player 
 */
export const get_settingProp = (player) => {

    let all = {};

    for (const type in default_setting_property)
        for (const identifier in default_setting_property[type])
            all[type][identifier] = default_setting_property[type][identifier];// player.getDynamicProperty(`${type}:${identifier}`)

    return all;
}

export const set_settingProp = (player, type, values) => {
    const prefixs = Object.keys(default_setting_property[type])
    for (let i = 0; i < values.length; i++) player.setDynamicProperty(`${type}:${prefixs[i]}`, values[i])
    return true;
}
