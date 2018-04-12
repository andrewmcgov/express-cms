require('dotenv').config({ path: __dirname + '/../variables.env' });
const fs = require('fs');

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises

// import all of our models - they need to be imported only once
const Admin = require('../models/Admin');
const Post = require('../models/Post');
const Menu = require('../models/Menu');

const admins = JSON.parse(fs.readFileSync(__dirname + '/admins.json', 'utf-8'));
const posts = JSON.parse(fs.readFileSync(__dirname + '/posts.json', 'utf-8'));
const menus = JSON.parse(fs.readFileSync(__dirname + '/menus.json', 'utf-8'));

async function deleteData() {
  console.log('😢😢 Goodbye Data...');
  await Admin.remove();
  await Post.remove();
  await Menu.remove();
  console.log(
    'Data Deleted. To load sample data, run\n\n\t npm run sample\n\n'
  );
  process.exit();
}

async function loadData() {
  try {
    await Admin.insertMany(admins);
    await Post.insertMany(posts);
    await Menu.insertMany(menus);
    console.log('👍👍👍👍👍👍👍👍 Done!');
    process.exit();
  } catch (e) {
    console.log(
      '\n👎👎👎👎👎👎👎👎 Error! The Error info is below but if you are importing sample data make sure to drop the existing database first with.\n\n\t npm run blowitallaway\n\n\n'
    );
    console.log(e);
    process.exit();
  }
}
if (process.argv.includes('--delete')) {
  deleteData();
} else {
  loadData();
}
