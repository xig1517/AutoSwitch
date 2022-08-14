import { DynamicPropertiesDefinition, MinecraftEntityTypes, world } from "mojang-minecraft"
import { default_setting_property } from "../dynamicProperty/info/_setting"

export const worldInitialize = () => {

    const worldData = {
        server: {
            'enable': 'boolean',
        }
    }

    world.events.worldInitialize.subscribe(ev => {

        const register = (registerType, type, identifier, dataType, length = undefined) => {
            const definition = new DynamicPropertiesDefinition();
            switch (dataType) {
                case 'string': definition.defineString(`${type}:${identifier}`, length); break;
                case 'number': definition.defineNumber(`${type}:${identifier}`); break;
                case 'boolean': definition.defineBoolean(`${type}:${identifier}`); break;
            }
            registerType === 'world'
                ? ev.propertyRegistry.registerWorldDynamicProperties(definition)
                : ev.propertyRegistry.registerEntityTypeDynamicProperties(definition, MinecraftEntityTypes[registerType]);
        }

        const initWorldProp = () => {
            const worldDefaultProp = {
                server: {
                    'enable': true,
                }
            }
            for (const type in worldDefaultProp)
                for (const [identifier, value] of Object.entries(worldDefaultProp[type]))
                    if (world.getDynamicProperty(`${type}:${identifier}`) === undefined) world.setDynamicProperty(`${type}:${identifier}`, value);
        }

        for (const type in default_setting_property)
            for (const [identifier, dataType] of Object.entries(default_setting_property[type]))
                dataType === 'string' ? register('player', type, identifier, dataType, 256) : register('player', type, identifier, dataType);

        for (const type in worldData)
            for (const [identifier, dataType] of Object.entries(worldData[type])) {
                try { world.getDynamicProperty(`${type}:${identifier}`); } catch {
                    dataType === 'string' ? register('world', type, identifier, dataType, 256) : register('world', type, identifier, dataType);
                }
            }

        initWorldProp();
    })

}