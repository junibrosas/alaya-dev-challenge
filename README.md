
# Alaya mern dev challenge 

MERN is a scaffolding tool which makes it easy to build isomorphic apps using Mongo, Express, React and NodeJS. It minimises the setup time and gets you up to speed using proven technologies.

- [Website](http://mern.io)
- [Documentation](http://mern.io/documentation.html)
- [Discussions](https://hashnode.com/n/mern)

**Note : Please make sure your MongoDB is running.** For MongoDB installation guide see [this](https://docs.mongodb.org/v3.0/installation/). Also `npm6` is required to install dependencies properly.

## Quickstart

```sh
  npm install
  npm start
```

### ES6 support
We use babel to transpile code in both server and client with `stage-0` plugin. So, you can use both ES6 and experimental ES7 features.


## Show us your skills :)

In this project (*which is just a [mern-starter](http://mern.io/documentation.html)*) you can write and edit post blog.

To show us your skills we would like you to build at least one of theses 2 features:

### 1 - Add geolocation to post creation and display it on post element (Full-stack)

The purpose is to be able to attach a geolocation by entering an address in the `PostCreatWidget`,
 to persit it in the `post.js` mongoose model and then to display it using the `PostListItem.js`

For the geocoding you can use the api you want (like [nominatim](https://wiki.openstreetmap.org/wiki/Nominatim) for [openstreetmap](https://www.openstreetmap.org/#map=5/46.449/2.210) 
or [google maps](https://developers.google.com/maps/documentation/geocoding/start)).

It would be perfect if we can store at least one gps location and one address in database by post.

You can maybe use the [MongoDB geospatial api](https://docs.mongodb.com/manual/geospatial-queries/) to format your data

### 2 - Add a markdown rich text editor to post creation (Front-end)

You can write markdown manually when creating a post.

To render markdown content we use `ReactMarkdown` in the `PostListItem`.

The purpose here is to have a wysiwyg rich text editor component with a material-ui style doing this stuff when creating a post.

You can use any npm package you want (like [slatejs](https://www.slatejs.org/#/rich-text) or maybe [react-mde](https://github.com/andrerpena/react-mde))

### 3 - Add comments and likes on posts

We want to be able to make a comment and to like each post.

The user that comments will have to put an author name and a message in the comment form. 

These informations will be stored in DB using mongoose.

The comment button has to be on the post list and the list of comments has to be on the post page.

For the likes (anonymous) we will have a counter beside the like button to display the number of likes ( stored in DB ).

*Note that we don't have connected user so this test is more to see how you implement the logic*

Good luck :)
