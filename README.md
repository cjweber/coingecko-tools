## Coingecko CLI tools

## Setup
1. Clone the repo
2. Run npx tsc
3. Use commands to find coin ids, add / remove coin ids to check, and to check price data of coins you have added to the check list. Confused? run (from base of directory) `./build/cli.js help`

## Notes
1. You can pass any filepath for your ids with arguments i.e.: `./build/cli.js check --coinIdFilepath /Users/0xcjw/Code/coinchecker/coinidsEXAMPLE.txt`, otherwise `coinids.txt` will be initialized in the repo directory when you add your first coin
2. I randomly decided to make this for myself so do not consider this polished

## Example commands (these examples have me aliasing the `cli.js` file)
`coincheck check` : Checks existing list
`coincheck find "tresure under sea"`: Searches for id of TUS on coingecko and returns top 3
`coincheck editlist --dry`: Prints current list
`coincheck editlist --id bitcoin`: Appends bitcoin to the list
`coincheck editlist --id bitcoin --remove`: Removes bitcoin from the list

## TODO
1. More params: verbose output, time ranges, API key usage, etc...
2. Error handling
3. Tests
4. Proper packaging
5. Formatting
6. Make the code better?
7. Whatever people may want
