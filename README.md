# Image sharing server

- For demonstration purposes only.
- The system will reset data every day (or every redeploy), because Heroku does not provide any sort of persistent storage on dynos.

## API docs

Visit https://image-sharing-api-server.herokuapp.com/docs/

## Available Scripts

### How to set up development env?

```
npm install
npm run dev

```

### How to run test?

```
npm test

```

### Test upload file via curl or REST Client

#### curl

```
curl http://localhost:5000/v1/attachments -F 'file=@./test/dog.jpeg' -F 'description=hi image' -H "Authorization: Bearer your_jwt_access_token"
curl https://image-sharing-api-server.herokuapp.com/v1/attachments -F 'file=@./test/dog.jpeg' -F 'description=hi image' -H "Authorization: Bearer your_jwt_access_token"
```

#### REST Client

The file **test.http** can be used to make requests if you are using the [VSCode Rest Client extension](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)

## How to deploy to heroku?

```
heroku create image-sharing-api-server
heroku git:remote -a image-sharing-api-server
heroku config:set JWT_SECRET=ooxxooxx
heroku config:set IMAGE_PREFIX_URL=https://image-sharing-api-server.herokuapp.com/uploads/
git push heroku master
```

then go to
