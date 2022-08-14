import { entityHitBlock } from "./entityHitBlock";
//import { beforeChat } from "./beforeChat";
//import { playerJoin } from "./playerJoin";
//import { worldInitialize } from "./worldInitialize";

const events = [
    entityHitBlock,
    //beforeChat,
    //playerJoin,
    //worldInitialize,
]

export const eventHandler = () => events.forEach(event => event())

