import { ModalFormData } from "mojang-minecraft-ui"

import { ui_lang, ui_setting_property } from "../../dynamicProperty/info/_setting"
import { get_settingProp, set_settingProp } from "../../dynamicProperty/settingProp";
import { setting_mainHandler } from "./_handler";


const createPage = (player) => {

    const form = new ModalFormData().title('Common Setting');

    const [currentSetting, displayer] = [get_settingProp(player).common, ui_setting_property.common];
    const lang = ui_lang.common;

    for (const prefix in ui_setting_property.common)
        if (displayer[prefix].format[displayer[prefix].format.length - 1] === 'default')
            displayer[prefix].format.splice(displayer[prefix].format.length - 1, 1, currentSetting[prefix])

    for (const [prefix, info] of Object.entries(displayer)) {
        const format = info.format;
        switch (info.type) {
            case 'dropdown': form.dropdown(lang[prefix], format); break;
            case 'slider': form.slider(lang[prefix], format[1], format[2], format[3], format[4]); break;
            case 'textField': form.textField(lang[prefix], format[1], format[2]); break;
            case 'toggle': form.toggle(lang[prefix], format[1]); break;
        }
    }

    return form;
}

export const common = (player) =>
    createPage(player).show(player).then(response => {
        if (response.isCanceled) return setting_mainHandler(player);
        set_settingProp(player, 'common', response.formValues);
    })