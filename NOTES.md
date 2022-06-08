STEPS:
1. tsc --init to generate tsconfig.json
2. configure tsconfig outputDir and rootDir
  - rootDir as `./src` 
  - outDir as `./dist`
3. create a ts file, write any code.
4. create a src folder - move the ts file in there (src folder)
5. use `tsc` to generate a dist folder in the root adjacent to tsconfig
6. npm `init -y` to get `package.json`
7. `npm i express` to get express library
8. prepare dev dependency `npm i -D ts-node nodemon @types/node @types/express`
9. configure the start script in package.json

`
  "scripts": {
    "start": "node dist/gel.js",
    "dev": "nodemon src/gel.ts",
    "build":"tsc -p ."
  },

`

10. add middleware express bodyParser

Generate Random Secret Token:
1. terminal type `node`
2. require('crypto').randomBytes(64).toString('hex')

<!-- ODATA -->



- all employees born on the 8th day of a month
- http://host/service/Employees?$filter=day(BirthDate) eq 8

- price of nylon Dec 2021
- http://host/service/priceApi?$filter=month(BirthDate) eq 8

5.1.1 System Query Option $filter

5.1.2 System Query Option $expand

5.1.3 System Query Option $select

5.1.4 System Query Option $orderby

5.1.5 System Query Options $top and $skip

5.1.6 System Query Option $count

5.1.7 System Query Option $search

5.1.8 System Query Option $format
