const ModuleDependencyWarning = require('webpack/lib/ModuleDependencyWarning')

// ↓ Based on https://github.com/sindresorhus/escape-string-regexp
const escapeStringForRegExp = string => string.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')

module.exports = class IgnoreNotFoundExportPlugin {
  constructor(exportsToIgnore) {
    this.exportsToIgnore = exportsToIgnore || []
  }

  getMessageRegExp() {
    const exportsPattern = `(${this.exportsToIgnore.map(escapeStringForRegExp).join('|')})`

    return new RegExp(`export '${exportsPattern}'(.+?)was not found in (.+)`)
  }

  apply(compiler) {
    const messageRegExp = this.getMessageRegExp()

    const doneHook = (stats) => {
      // eslint-disable-next-line no-param-reassign
      stats.compilation.warnings = stats.compilation.warnings.filter(
        warn => !(
          warn instanceof ModuleDependencyWarning
            && messageRegExp.test(warn.message)
        ),
      )
    }

    if (compiler.hooks) {
      compiler.hooks.done.tap('IgnoreNotFoundExportPlugin', doneHook)
    } else {
      compiler.plugin('done', doneHook)
    }
  }
}
