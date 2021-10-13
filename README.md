# Image sharing server

- For demonstration purposes only.
- The system will reset data every day (or every redeploy), because Heroku does not provide any sort of persistent storage on dynos.

## API docs

Visit https://image-sharing-server.herokuapp.com/docs/

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
curl https://image-sharing-server.herokuapp.com/v1/attachments -F 'file=@./test/dog.jpeg' -F 'description=hi image' -H "Authorization: Bearer your_jwt_access_token"
```

#### REST Client

The file **test.http** can be used to make requests if you are using the [VSCode Rest Client extension](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)
