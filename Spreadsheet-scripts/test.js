function myFunction() {
    var currentSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var targetSheet = currentSpreadsheet.getSheetByName("Скачать");
    var emptyRow = targetSheet.getLastRow()
    Logger.log(emptyRow)
  }
  
  
  function deleteSpaces(){
    var str = 'aaa vvv ccc'
    Logger.log(str.replace(/\s+/g, ''))
  }
  
  function test1() {
    var sites = SitesApp.getSites();
    for(var i in sites) {
       Logger.log(sites[i].getUrl());
    }
  }
  
  function ex(){
  var pageStart = 0;
  var pageSize = 10;
  while (true) {
    Logger.log("Loading sites starting at %s", pageStart);
    var sites = SitesApp.getAllSites("example.com", pageStart, pageSize);
    if (sites.length == 0) {
      break;
    }
    Logger.log("Got %s sites back", sites.length);
    pageStart += sites.length;
    for(var i in sites) {
      Logger.log("Found site: %s", sites[i].getUrl());
    }
  }
}