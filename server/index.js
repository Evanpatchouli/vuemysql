// import db from "evanpatchouli-mysql/lib/sql.js";
// import express from "express";
const express = require("express");
const app = express();

let db = require("evanpatchouli-mysql/index.js");
db.quickConnConfig.database = "springdemo";

app.get("/", (req, res) => res.send("Hello World!"));

app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

app.get("/tbConstruct", async (req, res) => {
  let sql = "show full columns from ";
  let dbname = req.query.dbname;
  let tbname = req.query.tbname;
  sql = sql + tbname;
  let conn = await db.conn("localhost", 3306, "root", "root", dbname);
  let rs = await conn.sel(sql);
  conn.close();
  res.send(rs);
});

app.get("/dbs", async (req, res) => {
  let conn = await db.conn("localhost", 3306, "root", "root", "springdemo");
  let rs = await conn.getDbs();
  conn.close();
  res.send(rs);
});

app.get("/tbs", async (req, res) => {
  let dbname = req.query.dbname;
  let conn = await db.conn("localhost", 3306, "root", "root", dbname);
  let rs = await conn.getTbs(dbname);
  conn.close();
  res.send(rs);
});

app.get("/tbData", async (req, res) => {
  let dbname = req.query.dbname;
  let tbname = req.query.tbname;
  let conn = await db.conn("localhost", 3306, "root", "root", dbname);
  let rs = await conn.sel("select * from " + tbname);
  conn.close();
  res.send(rs);
});

app.get("/users", async (req, res) => {
  db.quickConnConfig.database = "SPRINGDEMO";
  let conn = await db.conn("localhost", 3306, "root", "root", "springdemo");
  let rs = await conn.sel("select * from user");
  conn.close();
  res.send(rs);
});

app.listen(3000, () => console.log("Server ready"));
