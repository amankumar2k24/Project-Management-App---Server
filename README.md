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
