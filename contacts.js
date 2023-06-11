const validator = require("validator");
const fs = require("fs");
// const readline = require("node:readline");
// const { stdin: input, stdout: output } = require("node:process");
// const rl = readline.createInterface({ input, output });

const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}
const fileData = "./data/contacts.json";
if (!fs.existsSync(fileData)) {
  fs.writeFileSync(fileData, "[]", "utf-8");
}
// data contacts
const loadContact = () => {
  const data = fs.readFileSync(fileData, "utf-8");
  const contacts = JSON.parse(data);
  return contacts;
};

// save contact
const saveContact = (name, email = "", noHp) => {
  const contact = { name, email, noHp };
  const contacts = loadContact();

  // cek duplikat
  const duplikat = contacts.find((contact) => contact.name === name);
  if (duplikat) {
    console.log("name sudah ada ");
    return false;
  }
  // check email
  if (email) {
    if (!validator.isEmail(email)) {
      console.log("email tidak valid");
      return false;
    }
  }
  // nomor
  if (!validator.isMobilePhone(noHp, "id-ID")) {
    console.log("nomor hp tidak valid");
    return false;
  }

  contacts.push(contact);
  fs.writeFileSync(fileData, JSON.stringify(contacts));
  console.log(`contact berhasil disave`);
};

// listcontact'
const listcontact = (e) => {
  const contacts = loadContact();
  console.log("list contact :");
  contacts.forEach((e, i) => {
    console.log(`${i + 1}. ${e.name} - ${e.noHp}`);
  });
  // console.table(contacts);
};
const detailContact = (e) => {
  const contacts = loadContact();

  // cari
  if (e.name) {
    const cariName = contacts.find(
      (contact) => contact.name.toLowerCase() === e.name.toLowerCase()
    );
    if (!cariName) {
      return console.log("nama tidak di temukan");
    }
    return console.table(cariName);
  }
  if (e.noHp) {
    const cariName = contacts.find((contact) => contact.name === e.noHp);
    if (!cariName) {
      return console.log("nama tidak di temukan");
    }
    return console.table(cariName);
  }
  console.table(contacts);
};

// delete contact
function deleteContact(name) {
  const contacts = loadContact();
  const data = contacts.filter((e)=>e.name !== name)
  
  if (contacts.length === data.length) {
    console.log(`${name} tidak di temukan`);
    return false
  }
  fs.writeFileSync(fileData, JSON.stringify(data));
  console.log(`${name} berhasil dihapus`);
}

module.exports = { saveContact, deleteContact, listcontact, detailContact };
// promise pertanyaan
// const pertanyaan = (question) => {
//   return new Promise((resolve, reject) => {
//     rl.question(question, (callback) => {
//       resolve(callback);
//     });
//   });
// };

// ini calback hell
// rl.question("masukan nama ", (name) => {
//   rl.question("masukan email ", (email) => {
//     rl.question("masukan noHp ", (noHp) => {
//       const contact = { name, email, noHp };
//       const data = fs.readFileSync(fileData, "utf-8");
//       const contacts = JSON.parse(data);
//       contacts.push(contact);
//       fs.writeFileSync(fileData, JSON.stringify(contacts));
//       console.log(`nama ${name} ,email ${email} , noHp ${noHp}  `);
//       rl.close();
//     });
//   });
// });
