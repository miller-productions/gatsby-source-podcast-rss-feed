# gatsby-source-podcast-rss-feed

This source plugin for Gatsby will load episode metadata from a podcast rss feed and make it available in GraphQL queries.

## Installation

```sh
npm install --save gatsby-source-podcast-rss-feed
```
or
```sh
yarn add gatsby-source-podcast-rss-feed
```
## Usage

```js
// In your `gatsby-config.js`
module.exports = {
  plugins: [
    {
        resolve: `gatsby-source-podcast-rss-feed`,
        options: {
          feedURL: `https://some.url/yourpodcastfeed.rss`,
        },
    },
  ],
}
```

## Options

Set `feedURL` to a live podcast rss feed.

## Querying

Once the plugin is configured, two new queries are available in GraphQL: `allpodcastRssFeedEpisode` and `podcastRssFeedEpisode`.

Here’s an example query to load the three (3) most recent episodes from your podcast rss feed:

```gql
query PodcastQuery {
  allPodcastRssFeedEpisode(limit: 3) {
    nodes {
      item {
        title
        link
        itunes {
          duration
        }
      }
    }
  }
}
```

## Related Info
See [Apple Podcasts Connect Help](https://help.apple.com/itc/podcasts_connect/#/itcb54353390) or [Google Feed Requirements](https://developers.google.com/search/reference/podcast/rss-feed) for info about podcast rss feed specification.