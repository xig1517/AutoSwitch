import { world } from "mojang-minecraft";
import { container } from "../container";
import { blockList } from "../list/blockList";

//import { setting_mainHandler } from "../ui/setting/_handler"

const verifyBlock = (block) => {
    for (const toolType in blockList)
        if (blockList[toolType].includes(block.id)) return toolType;

    return false;
}

export const entityHitBlock = () => {

    world.events.entityHit.subscribe(ev => {

        let containers = {};

        const player = ev.entity;
        const block = ev.hitBlock;
        if (block === undefined) return;

        /*
        if (player.hasTag('open_setting')) {
            setting_mainHandler(player);
            return;
        }*/

        const toolType = verifyBlock(block);
        if (!toolType) return;

        if (containers[player.name] === undefined) containers[player.name] = new container(player);

        const playerContainer = containers[player.name];
        playerContainer.refreshInventory();
        playerContainer.switchTool(toolType);
    })

}