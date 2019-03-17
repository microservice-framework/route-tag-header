'use strict'

const debug = {
  log: require('debug')('tag-header:log'),
  debug: require('debug')('tag-header:debug')
};

var latestProcessedRoute = false

module.exports = {
  name: 'header',
  type: 'request',
  handler: function(taggedTargets, config, allTargets, targetRequest){
    debug.debug('processing header %O', config)
    
    // Skip if miss configured
    if (!config || !config.headers) {
      debug.debug('skip. miss configured. No headers %O', config)
      return
    }
    // Skip if miss headers
    if (!targetRequest.requestDetails.headers) {
      debug.debug('skip. missing headers %O', targetRequest.requestDetails)
      return
    }

    for (let header in config.headers) {
      if (!targetRequest.requestDetails.headers[header.toLowerCase()]) {
        // Skip if not all headers exists in request
        debug.debug('skip. missing header %s in %O',
          header.toLowerCase(), targetRequest.requestDetails.headers)
        return
      }
    }
    let voteSize = 1000
    if (config && config.voteSize) {
      voteSize = config.voteSize
    }

    for (let i in taggedTargets) {
      taggedTargets[i].vote += voteSize
    }
  }
}
