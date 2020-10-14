export const KEY_MODE_FRIEND = "mode_friend";
export const KEY_MODE_FRIQUENCY_UPDATE = "mode_frequency_update";
export const KEY_MODE_SHOW_MS = "mode_show_ms";
export const KEY_USE_SOUND = "use_sound";
export const KEY_TIMEOFFSET = "timeoffset";
export const KEY_TIMEOFFSET_UPDATED_AT = "timeoffset_updatedAt";

export const CONFIG_PARAM = {};
CONFIG_PARAM[KEY_MODE_FRIEND] = { type: Boolean, default: false };
CONFIG_PARAM[KEY_MODE_FRIQUENCY_UPDATE] = { type: Boolean, default: false };
CONFIG_PARAM[KEY_MODE_SHOW_MS] = { type: Boolean, default: false };
CONFIG_PARAM[KEY_USE_SOUND] = { type: Boolean, default: false };
CONFIG_PARAM[KEY_TIMEOFFSET] = { type: Number, default: 0 };
CONFIG_PARAM[KEY_TIMEOFFSET_UPDATED_AT] = { type: Number, default: 0 };

class Config {
    constructor(scheme) {
        this.scheme = scheme;
    }
    load() {
        const scheme = this.scheme;
        Object.keys(this.scheme).forEach((key) => {
            const info = this.scheme[key];
            const type = info["type"];

            var value = localStorage[key];
            if (value === undefined || value === null) {
                value = info["default"];
            }

            if (type === Boolean) {
                this[key] = value == "true" || value == true ? true : false;
            } else if (type === Number) {
                this[key] = Number(value);
            } else if (type === String) {
                this[key] = String(value);
            } else {
                this[key] = value;
            }
        }, this);
    }
    save(key, value) {
        localStorage[key] = value;
        this[key] = value;
    }
}

const config = new Config(CONFIG_PARAM);
config.load();

export default config;
