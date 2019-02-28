

class Config {
    constructor(listener, scheme) {
        this.listener = listener;
        this.scheme = scheme;
    }
    load() {
        const scheme = this.scheme;
        Object.keys(this.scheme).forEach(key => {
            const info = this.scheme[key];
            //console.log(this)
            const type = info["type"];
            const def  = info["default"];

            var value = localStorage[key];
            if (value == undefined || value == null) {
                value = def;
            }

            switch(type) {
                case Boolean:
                {
                    this[key] = (value == 'true' || value == true) ? true : false;
                    break;
                }
                case Number:
                {
                    this[key] = Number(value);
                    break;
                }
                case String:
                {
                    this[key] = String(value);
                    break;
                }
            }
        });
        
        if (this.listener) {
            this.listener(this);
        }
    }
    save(partial=undefined) {
        if (partial) {
            Object.keys(partial).forEach(key => {
                //console.log(localStorage[key] );
                localStorage[key] = partial[key];
                //console.log(key );
                //console.log(localStorage[key] );
            });
        } else {
            Object.keys(this.scheme).forEach(key => {
                //console.log(localStorage[key] );
                localStorage[key] = this[key];
                //console.log(key );
                //console.log(localStorage[key] );
            });
        }
    }
}

export default Config;