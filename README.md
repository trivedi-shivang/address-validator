## Instructions:

1.  Run `npm install` (will instll packages from `package.json`)
2.  Run `node index.js` (This will test addresses mentioned in `test.csv`. If you want to execute it with a different csv file, simply run `node index.js file.csv` where `file` is the file-name with csv-extension)

## Thought Process

The problem was broken down into parts before writing code for the same.
The first task was to figure out how to read-from/write-to the file. This can be done synchronously or asynchronously. I did asynchronously because in future there is a possibility to horizontally-scale the application where millions of addresses have to be validated and those addresses are part of a big file. The file, if read synnchronously, may slow down the computer. Thus, created a read-file-stream (which would read file-contents in chunks).

The second task was to use a package to parse csv-file. There are many packages available for the task. I choose the one which would parse stream and store those addresses into an array.

The third task was to use a package which would validate those addresses. Before implementing a functionality around that, I read documentation about what possible statuses the `http` response will send me back(valid, invalid..etc ). I used a simple package called `axios`. It helps to make `http` requests to the address-validator URL. I created `validateAddress` with code-extensibility in mind (what if in future someone wants to validate address with more parameters?). They could simply add those parameters and can append them to the dynamically generated URL.
