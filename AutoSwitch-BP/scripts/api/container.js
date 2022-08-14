import { MinecraftItemTypes, Player } from "mojang-minecraft";

import { tools } from "./list/toolList";
//import { get_settingProp } from "./dynamicProperty/settingProp";

/** 
 * @param {Player} player 
 * */
export class container {

    inventory = [];

    constructor(player) {
        //this.setting = get_settingProp(player);
        this.container = player.getComponent('inventory').container;
    }

    getProp = (type, identifier) => this.setting[type][identifier];
    getItem = (slot) => this.container.getItem(slot) === undefined ? MinecraftItemTypes.air : this.container.getItem(slot);

    refreshInventory = () => {
        //const length = this.getProp('common', 'onlyHotbar') ? 8 : 35;
        for (let i = 0; i <= 35/*length*/; i++) this.inventory.push(this.getItem(i));
    }

    swapItem = (slot1, slot2) => {
        const [item1, item2] = [this.getItem(slot1), this.getItem(slot2)];
        (item1.id === 'minecraft:air' || item2.id === 'minecraft:air') ?
            this.container.transferItem(slot2, slot1, this.container)
            : this.container.swapItems(slot1, slot2, this.container)
    }

    switchTool = (toolType) => {
        const handSlot = 0;//this.getProp('preference', 'hand_slot');
        if (tools[toolType].includes(this.getItem(handSlot).id)) return;

        let targetItem = [-1, 0];
        for (let index = 0; index < this.inventory.length; index++) {
            const priority = tools[toolType].indexOf(this.inventory[index].id);
            if (priority === -1) continue;
            if (targetItem[0] < priority) targetItem = [priority, index];
        }
        this.swapItem(handSlot, targetItem[1]);
    }

}