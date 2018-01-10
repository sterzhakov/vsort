const rules = [
  {
    check: config => !(config.rootNode instanceof HTMLElement),
    message: 'config.rootNode is not a HTMLElement'
  }
]

const findConfigErrors = config => {

  return rules.reduce((messages, rule) => {

    if (rule.check(config)) return [ ...messages, rule.message ]

    return messages

  }, [])

}

module.exports = findConfigErrors
