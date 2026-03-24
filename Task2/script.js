function deepClone(inputObj) {
    const map = new Map();

    function clone(obj) {
        if (obj === null || typeof obj !== 'object') {
            return obj;
        }

        if (map.has(obj)) {
            return map.get(obj);
        }

        let copy;

        if (obj instanceof Date) {
            return new Date(obj.getTime());
        }

        if (Array.isArray(obj)) {
            copy = [];
            map.set(obj, copy);
            for (let i = 0; i < obj.length; i++) {
                copy[i] = clone(obj[i]);
            }
            return copy;
        }

        if (obj instanceof Map) {
            copy = new Map();
            map.set(obj, copy);
            obj.forEach((value, key) => {
                copy.set(clone(key), clone(value));
            });
            return copy;
        }

        if (obj instanceof Set) {
            copy = new Set();
            map.set(obj, copy);
            obj.forEach((value) => {
                copy.add(clone(value));
            });
            return copy;
        }

        copy = new obj.constructor();
        map.set(obj, copy);

        const keys = Object.keys(obj);
        for (let key of keys) {
            copy[key] = clone(obj[key]);
        }

        const symbols = Object.getOwnPropertySymbols(obj);
        for (let sym of symbols) {
            copy[sym] = clone(obj[sym]);
        }

        return copy;
    }

    return clone(inputObj);
}