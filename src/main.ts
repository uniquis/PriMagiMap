const range =
    (start: number, end: number) => Array.from({length: (end - start + 1)}, (v, k) => k + start);

class Shop {
    id: number
    name: string
    address: string
    pref: number

    constructor(name: string, address: string, pref: number,id?: number) {
        this.id=id;
        this.name=name;
        this.address=address;
        this.pref=pref;
    }
}

function myFunction():void {
    clear_list();
    range(1, 47).forEach(i=>write_list(fetch_shop(i)));
}

function fetch_shop(p:number=1):Shop[]{
    const res = UrlFetchApp.fetch('https://cdnprimagiimg01.blob.core.windows.net/primagi/data/json/shop/'+p+'.json');

    const content = res.getContentText();
    const data=JSON.parse(content);

    let shoplist=[];
    for(let k in data){
        const s = data[k];
        const sp=new Shop(s.Name, s.Address, p, Number(k));
        shoplist.push(sp);
    }
    // Logger.log(shoplist);

    return shoplist;
}
function clear_list(){
    const sh = SpreadsheetApp.getActiveSheet();
    const lastrow = sh.getLastRow();

    sh.getRange(2,1,lastrow-1,4).clear();
}

function write_list(shoplist:Shop[]){
    const sh = SpreadsheetApp.getActiveSheet();
    const lastrow = sh.getLastRow();

    shoplist.forEach((e,i)=>{
        sh.getRange(lastrow+i+1,1,1,4).setValues([[e.name,e.address,e.pref,e.id]])
    })
}

function fetch_list():Shop[]{
    const ss=SpreadsheetApp.getActiveSpreadsheet();
    const shopsheet=ss.getSheetByName('shoplist');
    const lastrow=shopsheet.getLastRow();
    const range = shopsheet.getRange(2,1,lastrow-1,3);
    const values = range.getValues();

    const shoplist=values.map(e => new Shop(e[0],e[1],e[2],e[3]));
    Logger.log(shoplist);

    return shoplist;
}
