// Install beautify
let s = document.createElement("script");
s.type = "module";
s.src = chrome.runtime.getURL("beautify.js");
(document.head || document.documentElement).appendChild(s);

// import script
let dom_elem = document.createElement("script");
dom_elem.type = "module";
dom_elem.src = chrome.runtime.getURL("script.js");
(document.head || document.documentElement).appendChild(dom_elem);
