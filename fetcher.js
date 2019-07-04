const request = require("request");
const fs = require("fs");
//argument 1 : URL
//argument 2: local file path
const args = process.argv.slice(2);

let combine = function(name1, name2) {
  let result = "";
  name2 = name2.replace("./", "");
  result = name1 + name2;
  return result;
};

const URL = combine(args[0], args[1]);
request(`${URL}`, (error, response, body) => {
  console.log(URL);
  if (error) {
    console.log("cannot get request");
  } else {
    //if not an error
    fs.writeFile(args[1], body, error => {
      if (error) {
        console.log("could not create file");
      } else {
        fs.stat(args[1], (err, stats) => {
          if (err) {
            console.log("could not get file size");
          } else {
            console.log(
              `Downloaded and saved ${stats.size} bytes to ${args[1]}`
            );
          }
        });
      }
    });
  }
  console.log("here");
});
