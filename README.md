# Sophina Firebase Admin
## Accounts

### Production
`$ firebase use prod`

### Development
`$ firebase use dev`

## Deploy
`$ firebase deploy`

> [!NOTE]
> Below is docs from the old project, so might not work exactly as expected.

## Run Locally
### Emulator

`$ cd functions`
`$ npm run emulator`

If emulator doesn't start up and gives this error
`⚠  firestore: Port {portId} is not open on localhost, could not start Firestore Emulator.`
`⚠  firestore: Port 8080 is not open on localhost, could not start Firestore Emulator.`

run the following command to kill the process
`$ npm run killemulator`

`$ lsof -ti tcp:{portId} | xargs kill`
`$ lsof -ti tcp:8080 | xargs kill`

[Taken from this link](https://fredriccliver.medium.com/port-8080-is-not-open-on-localhost-could-not-start-firestore-emulator-15c8c367d219)

#### Debug
Hit http://localhost:5001/plantwise-dev/us-central1/updateFirestoreFoodItemDatabase?updatecount=300

Update aroma pairings
updateFirestoreAromaPairingDatabase


### Firebase deploy

When deploying there will be a disconnect between indexes and firestore security rules_version.

Read [this](https://stackoverflow.com/questions/56307808/how-to-synchronize-firestore-rules-and-indexes) for more info on how to synchronise the security rules and indexes.

Run the following command to update the indexes from the Firebase Console to this local project.
`$ cd [project root aka. not functions]`
`$ firebase firestore:indexes > firestore.indexes.json`
