
const queryCode = require("./core/queryCode")
//@ts-ignore
window.exports = {
  scode: {
    // 注意：键对应的是 plugin.json 中的 features.code
    mode: 'none', // 用于无需 UI 显示，执行一些简单的代码
    args: {
      // 进入插件应用时调用
      enter: () => {
        // action = { code, type, payload }
        utools.hideMainWindow()
        queryCode().then(() => utools.outPlugin())
      },
    },
  },
}