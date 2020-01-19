const Parser = require("rss-parser")

exports.sourceNodes = async (
  { actions, createNodeId, createContentDigest },
  configOptions
) => {
  const { createNode } = actions

  delete configOptions.plugins

  const { feedURL } = configOptions
  const feed = await parseURL(feedURL)

  feed.items.forEach(item => {
    const nodeId = item.link
    const type = `podcastRssFeedEpisode`
    const description = `This node represents an individual podcast episode from the provided podcast rss feed.`
    createNode({
      item,
      id: createNodeId(`${type}${nodeId}`),
      parent: null,
      children: [],
      internal: {
        contentDigest: createContentDigest(item),
        type,
        description,
      },
    })
  })
  return
}

exports.onPreBootstrap = ({ reporter }, configOptions) => {
  const { feedURL } = configOptions

  if (!feedURL) {
    reporter.panic(`Required plugin config option "feedURL" missng.`)
  }
  return
}

function parseURL(url) {
  return new Promise((resolve, reject) => {
    const parser = new Parser()

    parser.parseURL(url, (err, feed) => {
      if (err) {
        reject(err)
      }
      resolve(feed)
    })
  })
}
