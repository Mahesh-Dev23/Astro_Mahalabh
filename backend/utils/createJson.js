import { json } from "express";
// const express = require("express");
import cors from "cors";
import fs from "fs";
import path from "path";

export const createJson = (req, res) => {
  console.log("create file data", req.body);
  const userData = req.body;
  //    const newUser = req.body; // { name: "xyz", ... }

  const fileName = `user.json`;

  console.log(fileName);
  const filePath = path.join("../backend4/store", fileName);

  //   fs.writeFile(filePath, JSON.stringify(userData, null, 2), (res, err) => {
  //     if (err) {
  //       return res.status(500).json({ error: "Failed to save file" });
  //     }
  //     // console.log(res);
  //     // res.json({ success: true, file: fileName });
  //   });

  try {
    let fileData = { users: [] }; // allUsers
    let newUsers = [];

    // 1. Read existing file (if exists)
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath);

      fileData = JSON.parse(raw);
      console.log("raw", fileData, typeof fileData);
    }

    // 2. Ensure allUsers array exists
    if (!fileData.users) {
      fileData.users = [];
    }

    // // 3. Check if user already exists by name
    // const exists = fileData.allUsers.some(
    //   (user) => Object.keys(user)[0] === req.body.name,
    // );

    // if (exists) {
    //   return res.json({
    //     success: false,
    //     message: "User already exists",
    //   });
    // }

    // 4. Add new user
    console.log(typeof fileData.users);
    fileData.users.push(userData);
    // console.log(filePath);
    // 5. Save back to file
    fs.writeFileSync(filePath, JSON.stringify(fileData, null, 2));

    res.json({
      success: true,
      message: "User added",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Failed to save data",
    });
  }
};
