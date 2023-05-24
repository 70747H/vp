# Voucher Pool App
A voucher pool application that generates vouchers associated to an offer and user that can be consumed later.

stack: NestJs, PostgreSql, Typeorm

## instructions:
1. Run docker container for postgres.
```
docker run --name postgresql -e POSTGRES_USER=username -e POSTGRES_PASSWORD=password -e POSTGRES_DB=voucher_pool -p 5432:5432 -d postgres
```
2. Install dependencies.
```
npm i
```
3. Build the project.
```
npm run build
```
4. Run the migrations.
```
npm run migrate
```
5. Run the seeders.
```
npm run seed
```

## Run both APP&DB in docker
1. Run docker container for postgres.
```
docker run --name postgresql --net=host -e POSTGRES_USER=username -e POSTGRES_PASSWORD=password -e POSTGRES_DB=voucher_pool -p 5432:5432 -d postgres
```
2. Run docker container for NestJs APP.
```
docker run --name voucher_pool_api --net=host -p6000:6000 voucher_pool_api
```