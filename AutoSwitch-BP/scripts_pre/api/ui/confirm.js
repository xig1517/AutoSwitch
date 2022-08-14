import { ActionFormData } from "mojang-minecraft-ui"

export const confirmPage = (target, bodyMessage = ``, button = 'confirm', lastPage = undefined) =>
    new ActionFormData()
        .title('Confirm Page')
        .body(bodyMessage)
        .button(button)
        .show(target).then(responce => { if (lastPage !== undefined) lastPage(player) })