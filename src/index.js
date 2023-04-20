import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const loadWebmWasm = async () => {
  const buffer = await fetch(
    "https://unpkg.com/webm-wasm@0.4.1/dist/webm-worker.js"
  ).then(r => r.arrayBuffer());
  const worker = new Worker(
    URL.createObjectURL(new Blob([buffer], { type: "text/javascript" }))
  );
  worker.postMessage("https://unpkg.com/webm-wasm@0.4.1/dist/webm-wasm.wasm");

  await nextMessage(worker);

  worker.postMessage({
    width: 512,
    height: 512
  });
}

function nextMessage(target) {
  return new Promise(resolve => {
    if ("once" in target) {
      return target.once("message", resolve);
    }
    return target.addEventListener("message", e => resolve(e.data), {
      once: true
    });
  });
}

loadWebmWasm()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
