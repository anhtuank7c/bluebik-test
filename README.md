# BlueBik test

Refinement document: https://www.notion.so/ctlab/BlueBik-test-1c45f389e844486bad4d70a9fda8da06?pvs=4

## How to run project

I assume you clone this repo into `/root/bluebik`

```
cd /root/bluebik
npm install
npx expo run:ios --device
npx expo run:android --device
```

## Test

Unit test: `npm run test`

**Before test E2E**: [Config devices to match your environment first](https://wix.github.io/Detox/docs/introduction/project-setup#step-3-device-configs)

E2E test on iOS: `npm run e2e-ios-debug` (You may got an issue with iPhone 14 Pro simulator which may not exist on your machine if not config devices)

E2E test on Android: `npm run e2e-ios-debug`

## Summaries

* Simple unit test works for components
* E2E test work perfectly on iOS and can complete onboarding flow but on Android it just can pass the first step. (I still investigate it)
* Why don't you use Bare React Native project? Well, good question. I initialy choose Bare RN for years but realize upgrading project is painful and it has a plenty of unrecoginized issue which might break your plan. Expo come up with well tested release, easy to upgrade and much easier to code native modules in Kotlin & Swift, New Architecture.