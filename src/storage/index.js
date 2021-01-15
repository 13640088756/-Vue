// Storage封装

const STORAGE_KEY = 'mall';
export default {
    setItem(key, value, module_name) {
        if (module_name) {
            let val = this.getItem(module_name);
            val[key] = value;
            this.setItem(module_name, val)
        } else {
            let val = this.getStorage();
            val[key] = value;
            window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(val))
        }
    },
    //获取某一个模块下面的属性，例如user(module_name)模块下的userName(key)
    getItem(key, module_name) {
        if (module_name) {
            //递归执行，getItem(moduke_name) module_name变为了第一个参数,其实就是相对于执行 getStorage()[key] ，也就是例子中this.getStorage()[user]
            let val = this.getItem(module_name)
                // val返回objct
            if (val) return val[key];
        }
        // 获取全部
        return this.getStorage()[key];
    },
    getStorage() {
        return JSON.parse(window.sessionStorage.getItem(STORAGE_KEY) || "{}");
    },
    celar(key, module_name) {
        let val = this.getStorage();
        if (module_name) {
            delete val[module_name][key];
        } else {
            delete val[key];
        }
        window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(val));
    }

}