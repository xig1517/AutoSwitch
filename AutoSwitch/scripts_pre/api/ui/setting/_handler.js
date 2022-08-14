import { ActionFormData } from "mojang-minecraft-ui"
import { common } from "./common";
import { preference } from "./preference";

const createPage = () => new ActionFormData()
    .title('Setting')
    .button('Common')
    .button('Preference');

export const setting_mainHandler = (player) => {
    createPage().show(player).then(response => {
        if (response.isCanceled) return;
        return [common, preference][response.selection](player)
    })
}