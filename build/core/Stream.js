class Stream {

  constructor(...sources) {

    const grouppedSources = sources.reduce((memo, source) => {

      const key = this.isDynamicSource(source)
        ? 'dynamicSources'
        : 'staticSources'

      return Object.assign({}, memo, { [key]: [ ...memo[key], source ] })

    }, { staticSources: [], dynamicSources: [] })

    this.staticSources = grouppedSources.staticSources
    this.dynamicSources = grouppedSources.dynamicSources

    this.modifiers = []
    this.value = null

  }

  subscribe(onChange) {

    this.onChange = onChange

    this.staticSources.forEach(source => {

      source.listen()
      source.addSubscriber(this)

    })

  }

  isDynamicSource(source) {

    return 'addWhen' in source || 'removeWhen' in source

  }

  unsubscribe() {

    const sources = [ ...this.staticSources, ...this.dynamicSources ]

    sources.forEach(source => source.mute())

  }

  notify(value) {

    const newValue = this.modifiers.reduce((value, modifier) => {

      if (modifier.type == 'reduce') {

        return modifier.modify(this.value, value)

      }

      return value

    }, value)

    this.value = newValue

    this.onChange(newValue)

    this.manageDynamicSources(newValue)

  }

  manageDynamicSources(value) {

    this.dynamicSources.forEach(dynamicSource => {

      if (!dynamicSource.active && dynamicSource.addWhen(value)) {

        dynamicSource.listen()
        dynamicSource.addSubscriber(this)

      }

      if (dynamicSource.active && dynamicSource.removeWhen(value)) {

        dynamicSource.mute()
        dynamicSource.removeSubscriber(this)

      }

    })

  }

  reduce(callback, initialValue) {

    this.value = initialValue

    this.modifiers = [
      ...this.modifiers,
      { type: 'reduce', modify: callback }
    ]

    return this

  }

}

module.exports = Stream
