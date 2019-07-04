const request = require("request");
const fs = require("fs");
const readline = require("readline");
//argument 1 : URL
//argument 2: local file path
const args = process.argv.slice(2);
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

request(args[0], (error, response, body) => {
  if (error) {
    console.log("cannot get request - this is an error or non 200 result");
  } else {
    fs.access(args[1], error => {
      if (!error) {
        //file does exist
        //questions
        rl.question("overide? press Y to overide.", answer => {
          if (answer === "Y") {
            //write file
            fs.writeFile(args[1], body, error => {
              if (error) {
                console.log(
                  "could not create file. local file path given is invalid"
                );
              } else {
                //if file was created
                console.log(
                  `Downloaded and saved ${fs.statSync(args[1]).size} bytes to ${
                    args[1]
                  }`
                );
                //rl.close();
              }
            });
            rl.close();
          } else {
            rl.close();
            //end
          }
        });
      } else {
        //if file does not exist
        //if there is not an error - keep running the program
        fs.writeFile(args[1], body, error => {
          if (error) {
            console.log(
              "could not create file. local file path given is invalid"
            );
          } else {
            //if file was created
            console.log(
              `Downloaded and saved ${fs.statSync(args[1]).size} bytes to ${
                args[1]
              }`
            );
          }
        });
      }
    });
  }
});
