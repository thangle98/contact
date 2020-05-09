var fs = require('fs');
var readLineSync = require('readline-sync');
var listContact = [];
// load data len
function loadData(){
    var data = fs.readFileSync('data.json');
    listContact = JSON.parse(data);
}

// ghi vao file
function writeFile(){
    var data = JSON.stringify(listContact);
    fs.writeFileSync('./data.json',data);
}

// luu file
function save(){
  writeFile();
}

// hien thi toan bo so lien lac len man hinh
function show(){
  loadData();
  console.log(listContact);
}
// add so lien lac moi
function addContact(){
  var name = readLineSync.question('name: ');
  var phoneNum = readLineSync.question('phone: ');
  var contact = {
    Name: name,
    Phone: phoneNum
  };
  listContact.push(contact);
  save();
  console.log("\nthem thanh cong nhe!");
}

// sua so lien lac
function editContact(){
    var id = readLineSync.question('Lua chon id contact can sua: ');
    var name = readLineSync.question('name: ');
    var phone = readLineSync.question('phoneNum:');
    listContact[id].Name = name;
    listContact[id].Phone = phone;
    save();
    console.log("\nsua thanh cong nhe!");
  }

// ham xoa so lien lac
function deleteContact(){
  var id = readLineSync.question("Lua chon id contact can xoa: ");
  listContact.splice(id,1);
  save();
  console.log("\nXoa thanh cong nhe!")

}

// ham serach theo name
function searchName(name){
  var nameABC = change_alias(name).toLowerCase();
  for(let contact of listContact)
  {
    if(change_alias(contact.Name).toLowerCase().indexOf(nameABC)!== -1)
      console.log(contact);
  }
}

// ham chuyen doi ki tu co dau va ko dau
function change_alias(alias) {
  var str = alias;
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  str = str.replace(/Đ/g, "D");
  str = str.trim(); 
  return str;
}

// ham search sdt
function searchPhone(num){
  for(var x of listContact)
  {
    if(x.Phone.indexOf(num) !== -1){
      console.log(x);
    }
  }
}

// ham tim kiem so lien lac
function findContact(){
    var name = readLineSync.question("Nhap vao thu ban muon tim kiem: ");
    if(isNaN(name) === false){
      searchPhone(name);
    }
    else{
      searchName(name);
    }  
  }


// hien thi laod menu
function showMenu(){
    loadData();
    console.log("\n***********************");
  console.log("1.Nhap du lieu contact:");
  console.log("2.Sua du lieu contact: ");
  console.log("3.Xoa contact");
  console.log("4.Tim kiem contact");
  console.log("5.Hien thi danh sach sdt");
  var num = readLineSync.question('nhap lua chon: ');
  switch(num){
    case '1':
      addContact();
      showMenu();
      break;
    case '2':
      editContact();
      showMenu();
      break;
    case '3':
      deleteContact();
      showMenu();
      break;
    case '4':
      findContact();
      showMenu();
      break;
    case '5':
      show()
      showMenu();
      break;
    default:
      showMenu();
      break;
  }
}

// ham thuc hien
function main(){
  showMenu();
}

main();