const yargs = require("yargs");
const { saveContact, deleteContact, listcontact, detailContact } = require("./contacts");

yargs
  .command({
    command: "add",
    describe: "to add contact",
    builder: {
      name: {
        describe: "nama lengkap",
        demandOption: true,
        type: "string",
      },
      email: {
        describe: "email",
        demandOption: false,
        type: "string",
      },
      noHp: {
        describe: "nomor hp",
        demandOption: true,
        type: "string",
      },
    },
    handler(argv) {
      saveContact(argv.name, argv.email, argv.noHp);
    },
  })
  .demandCommand();

// tampilkan list
yargs.command({
  command: "list",
  describe: "menampilkan list semua contact",
  builder: {},
  handler() {
    listcontact();
  },
});
// detail contact
yargs.command({
  command: "det",
  describe: "menampilkan detail sesuai nama atau nomor hp contact",
  builder: {
    name: {
      describe: "nama contact yang akan dicari",
      demandOption: false,
      type: "string",
    },
    noHp: {
      describe: "nomor hp contact yang akan dicari",
      demandOption: false,
      type: "string",
    },
  },
  handler(argv) {
    detailContact(argv);
  },
});

// delete contact
yargs.command({
  command: "delete",
  describe: "delete contact",
  builder: {
    name: {
      describe: "delete menurut nama",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    deleteContact(argv.name);
  },
});

yargs.parse();

// yargs.command("add","menambah contact",()=>{},(argv)=>{
//     console.log(argv)
// })
// const main= async()=>{
//     const nama = await pertanyaan("masukan nama : ")
//     const email = await pertanyaan("masukan email : ")
//     const noHp = await pertanyaan("masukan noHp: ")
//     saveContact(nama,email,noHp)
// }
// main()
