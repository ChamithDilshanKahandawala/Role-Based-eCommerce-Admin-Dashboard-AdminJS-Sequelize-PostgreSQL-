const isAdmin = require('./isAdmin');
const { isVisible } = require('./userOption');

const settingOptions = {
    isVisible:isAdmin,

    actions:{
        list:{isAccessible:isAdmin},
        new:{isAccessible:isAdmin},
        edit:{isAccessible:isAdmin},
        delete:{isAccessible:isAdmin},
        show:{isAccessible:isAdmin},
    },
};
module.exports = settingOptions;