export const default_setting_property = {
    common: {
        'onlyHotbar': true,
        'plugin_cooldown': 0
    },
    preference: {
        'hand_slot': 0,
        'switch_tool_notification': 'actionbar',
    }
}

export const ui_setting_property = {
    common: {
        'onlyHotbar': { type: 'toggle', format: ['default'] },
        'plugin_cooldown': { type: 'slider', format: [0, 10, 0.5, 'default'] }
    },
    preference: {
        'hand_slot': { type: 'slider', format: [0, 8, 1, 'default'] },
        'switch_tool_notification': { type: 'dropdown', format: ['actionbar', 'tellraw', 'none'] }
    }
}

export const ui_lang = {
    common: {
        'onlyHotbar': '是否只檢測Hotbar中的物品；為否，則偵測整個背包。',
        'plugin_cooldown': '插件執行冷卻時間(為0則不冷卻)',
    },
    preference: {
        'hand_slot': '設定用來當作主手的slot(0~8)',
        'switch_tool_notification': '是否開啟切換物品時的通知'
    }
}