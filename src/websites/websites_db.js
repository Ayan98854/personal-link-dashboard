class WebsitesDB {

  constructor() {
      var ForerunnerDB = require("forerunnerdb");
      var fbd = new ForerunnerDB();
      var db = fbd.db("personal-dashboard");

      this.fdb = db.collection("websites", {primaryKey: "name"}),

      this.refreshList();
  }


  save(website) {
    return this.fdb.insert(website);
  }

  remove(website) {
    this.fdb.remove({
        name: website.name
    });
  }

  getAll() {
    return this.fdb.find();
  }
}


export default WebsitesDB;
