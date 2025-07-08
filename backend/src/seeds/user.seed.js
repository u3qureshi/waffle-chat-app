import { config } from "dotenv";
import { connectToDB } from "../lib/db.js";
import User from "../models/user.model.js";

config();

const seedUsers = [
  {
    email: "michael.scott@dundermifflin.com",
    fullName: "Michael Scott",
    username: "michaelscott",
    password: "123456",
    profilePicture: "https://upload.wikimedia.org/wikipedia/en/d/dc/MichaelScott.png",
  },
  {
    email: "jim.halpert@dundermifflin.com",
    fullName: "Jim Halpert",
    username: "jimhalpert",
    password: "123456",
    profilePicture: "https://miro.medium.com/v2/resize:fit:1200/1*85yAuMNpsnshR9Hlppp6fw.png",
  },
  {
    email: "dwight.schrute@dundermifflin.com",
    fullName: "Dwight Schrute",
    username: "dwightschrute",
    password: "123456",
    profilePicture: "https://img.nbc.com/files/images/2013/11/12/dwight-500x500.jpg",
  },
  {
    email: "pam.beesly@dundermifflin.com",
    fullName: "Pam Beesly",
    username: "pambeesly",
    password: "123456",
    profilePicture: "https://boo-prod.b-cdn.net/database/profiles/1665985551133442b368b367602261f6d66d61f1777f8.jpg",
  },
  {
    email: "andy.bernard@dundermifflin.com",
    fullName: "Andy Bernard",
    username: "andybernard",
    password: "123456",
    profilePicture: "https://img.nbc.com/files/images/2013/11/12/andy-500x500.jpg",
  },
  {
    email: "kevin.malone@dundermifflin.com",
    fullName: "Kevin Malone",
    username: "kevinmalone",
    password: "123456",
    profilePicture: "https://openpsychometrics.org/tests/characters/test-resources/pics/TO/9.jpg",
  },
  {
    email: "stanley.hudson@dundermifflin.com",
    fullName: "Stanley Hudson",
    username: "stanleyhudson",
    password: "123456",
    profilePicture: "https://images.seeklogo.com/logo-png/43/1/the-office-tv-show-sign-logo-png_seeklogo-438510.png",
  },
  {
    email: "erin.hannon@dundermifflin.com",
    fullName: "Erin Hannon",
    username: "erinhannon",
    password: "123456",
    profilePicture: "https://images.seeklogo.com/logo-png/43/1/the-office-tv-show-sign-logo-png_seeklogo-438510.png",
  },
  {
    email: "angela.martin@dundermifflin.com",
    fullName: "Angela Martin",
    username: "angelamartin",
    password: "123456",
    profilePicture: "https://images.seeklogo.com/logo-png/43/1/the-office-tv-show-sign-logo-png_seeklogo-438510.png",
  },
  {
    email: "creed.bratton@dundermifflin.com",
    fullName: "Creed Bratton",
    username: "creedbratton",
    password: "123456",
    profilePicture: "https://images.seeklogo.com/logo-png/43/1/the-office-tv-show-sign-logo-png_seeklogo-438510.png",
  },
  {
    email: "oscar.martinez@dundermifflin.com",
    fullName: "Oscar Martinez",
    username: "oscarmartinez",
    password: "123456",
    profilePicture: "https://images.seeklogo.com/logo-png/43/1/the-office-tv-show-sign-logo-png_seeklogo-438510.png",
  },
  {
    email: "toby.flenderson@dundermifflin.com",
    fullName: "Toby Flenderson",
    username: "tobyflenderson",
    password: "123456",
    profilePicture: "https://images.seeklogo.com/logo-png/43/1/the-office-tv-show-sign-logo-png_seeklogo-438510.png",
  }
];

const seedDatabase = async () => {
  try {
    await connectToDB();
    await User.insertMany(seedUsers);
    console.log("📦 Database seeded with The Office characters!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  }
};

seedDatabase();
