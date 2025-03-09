# Sophina Firebase Admin
## Setup
###Install dependencies
```
npm install
```

### Environment Variables
Ensure you have the following files in the `functions` directory of the project.

.env.dev
.env.prod

Add the following to the `.env.dev` file.
```
OPENAI_API_KEY=your_dev_openai_api_key
```

Add the following to the `.env.prod` file.
```
OPENAI_API_KEY=your_production_openai_api_key
```

### Production
```
firebase use prod
```

### Development
```
firebase use dev
```

## Deploy
#### Development
```
npm run deploy-dev
```

#### Production
```
npm run deploy-prod
```


## Run Locally
### Emulator
```
npm run emulator
```

#### Live Updates
> Open a new terminal 
> Run the following command to ensure TypeScript is watching for changes to convert to JavaScript.
```
cd functions
npm run build:watch
```

#### Issues
> If emulator doesn't start up and gives this error
```
⚠  firestore: Port {portId} is not open on localhost, could not start Firestore Emulator.
⚠  firestore: Port 8080 is not open on localhost, could not start Firestore Emulator.
```

```
npm run killemulator
```

> If that fails kill emulator
```
$ lsof -ti tcp:{portId} | xargs kill
$ lsof -ti tcp:8080 | xargs kill
```

[Taken from this link](https://fredriccliver.medium.com/port-8080-is-not-open-on-localhost-could-not-start-firestore-emulator-15c8c367d219)

> Note below taken from another project.
### Firebase deploy

When deploying there will be a disconnect between indexes and firestore security rules_version.

Read [this](https://stackoverflow.com/questions/56307808/how-to-synchronize-firestore-rules-and-indexes) for more info on how to synchronise the security rules and indexes.

Run the following command to update the indexes from the Firebase Console to this local project.
```
cd [project root aka. not functions]
firebase firestore:indexes > firestore.indexes.json
```
