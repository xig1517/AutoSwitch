import { ModalFormData } from "mojang-minecraft-ui"

import { ui_lang, ui_setting_property } from "../../dynamicProperty/info/_setting"
import { get_settingProp } from "../../dynamicProperty/settingProp";


const createPage = (player) => {

    const form = new ModalFormData().title('Preference Setting');

    const [currentSetting, displayer] = [get_settingProp(player), ui_setting_property.preference];
    const lang = ui_lang;

    for (const prefix of ui_setting_property.preference)
        if (displayer.preference[prefix][displayer.preference[prefix].length - 1] === 'default') {
            displayer.preference[prefix].splice(displayer.preference[prefix].length - 1, 1, currentSetting.preference[prefix])
        }

    for (const [prefix, format] of displayer.preference)
        switch (format[0]) {
            case 'dropdown': form.dropdown(lang.preference[prefix], format[1]); break;
            case 'silder': form.slider(lang.preference[prefix], format[1], format[2], format[3], format[4]); break;
            case 'textField': form.textField(lang.preference[prefix], format[1], format[2])
            case 'toggle': form.toggle(lang.preference[prefix], format[1])
        }

    return form;
}

export const preference = (player) => createPage(player).show(player).then(response => response.formValues)
