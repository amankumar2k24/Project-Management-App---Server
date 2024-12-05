npm init -y
npm i -D ts-node typescript @types/node
npx tsc --init  => to create tsconfig.json

changes in tsconfig.json
1. "module" : "commonjs", into  "module" : "nodenext",
2. "moduleResolution" : "node10", into  "moduleResolution" : "nodenext",  (uncomment this)
3. "resolveJsonModule" : true (uncomment this)
4. "outDir" : "./", into  "outDir" : "./dist",

in the end of file 
5. add =>  "include": ["src/**/*", "src/data/**/*.json", "prisma/**/*"],

add in package.json 
in scripts: {
    "seed" : "ts-node src/data/seed.ts"
}

6. npx prisma init
7. npx prisma generate
8. npx prisma migrate dev --name init
9. npm run seed

after these 4 above command, you will see a new folder called migrations in prisma folder and in pgadmin there is lots of table like you created here in schema.prisma


10. npm i express body-parser cors dotenv helmet morgan
11. npm i -D rimraf concurrently nodemon @types/express @types/cors @types/node @types/morgan
 
 After this, in package.json

12. "build" : "rimraf dist &&  npx tsc",
13. "start" : "npm run build && node dist/index.js",
14. "dev": " npm run build && concurrently \"npx tsc -w\" \"nodemon --exec ts-node src/index.ts \"" 
15. in Terminal =>
run => npm run dev
       curl localhost:8000