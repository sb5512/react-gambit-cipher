const fetch = require("isomorphic-fetch");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

export default function decipherURLContent(endpointURL) {
  const proxyurl = "https://cors-anywhere.herokuapp.com/";

  return fetch(proxyurl + endpointURL)
    .then(res => {
      return res.text();
    })
    .then(data => {
      console.log(data);
      const dom = new JSDOM(data);
      let m = dom.window.document.querySelector("body").textContent; // "Hello world"
      console.log(m);
      let val = m
        .trim()
        .split("\n")[1]
        .trim()
        .split(" ");

      // now we decipher the data
      return decipherdata(val);
    });
}

function obtainShift(a, b, c) {
  return { first: 72 - a, second: 101 - b, third: 108 - c };
}

const decipherdata = val => {
  // We assume the first three character would be Hel representing Hello ..
  let { first, second, third } = obtainShift(...val);

  val = val.map((x, i) => {
    x = parseInt(x);
    let changed;
    switch (i % 3) {
      case 0:
        changed = x + first;
        break;
      case 1:
        changed = x + second;
        break;
      case 2:
        changed = x + third;
        break;
    }
    return String.fromCharCode(changed % 256);
  });
  return val.join("");
};

// Code obtained from the url for knowing the logic
function scramble(ascii, a, b, c) {
  for (let i = 0; i < ascii.length; i++) {
    if (i % 3 == 0) {
      ascii[i] = (ascii[i] + a) % 256;
    }
    if (i % 3 == 1) {
      ascii[i] = (ascii[i] + b) % 256;
    }
    if (i % 3 == 2) {
      ascii[i] = (ascii[i] + c) % 256;
    }
  }
  return ascii;
}
