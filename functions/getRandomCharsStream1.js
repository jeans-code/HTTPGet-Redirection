//const process = require("node:process");

let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
function getRandomChar() {
  return chars[Math.floor(Math.random() * chars.length)];
}

exports.handler = async function(event, context) {
  const ip = event.headers["x-forwarded-for"];
  console.log(ip + " wants 20 random characters.");
  const encoder = new TextEncoder();
  let body = new ReadableStream({
    start(controller) {
      let i = 0;
      let timer = setInterval(() => {
        //controller.enqueue(
        //  );
        controller.enqueue(encoder.encode(`${getRandomChar()}`));
        i++;
        if (i >= 20) {
          controller.close();
          clearInterval(timer);
          // controller.close();
          // clearInterval(
        }
      }, 100);
    }
  });

  return new Response(body);

  
};
