
## Running on docker

```bash
docker-compose up
```
[React Application](http://localhost:3005/) 


[Express Application health](http://127.0.0.1:3000/v1/status) 

## Running Locally

```bash
#app needs a mongo instance
docker run -d -p 27017:27017 --name app-db mongo:latest
#running backend
cd backend
yarn dev
cd ..
#running frontend
cd frontend
npm run start
```

## Test

```bash
cd backend
# run integration tests
yarn test:integration

# open nyc test coverage reports
yarn run postcoverage
```


## Documentation

```bash
cd backend
# generate and open api documentation
yarn docs
```

