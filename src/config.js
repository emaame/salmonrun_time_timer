

class Config {
    constructor(scheme) {
        this.scheme = scheme;
    }
    load() {
        const scheme = this.scheme;
        Object.keys(this.scheme).forEach(key => {
            const info = this.scheme[key];
            const type = info["type"];

            var value = localStorage[key];
            if (value === undefined || value === null) {
                value = info["default"];
            }

            if (type === Boolean) {
                this[key] = (value == 'true' || value == true) ? true : false;
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

export default Config;