const popup = document.querySelector('.popup'),
  wifiIcon = document.querySelector('.icon i'),
  popupTitle = document.querySelector('.popup .title'),
  popupDesc = document.querySelector('.desc'),
  reconnectBtn = document.querySelector('.reconnect');

let isOnline = true, inIntervalId, timer = 10;

const checkConnection = async () => {
  try {
    // try to frtch random data from th API. If the status codeis between
    // 200 & 300, the network connection is considered online
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    isOnline = response.status >= 200 && response.status < 300;
  } catch (error) {
    isOnline = false; // If there is an error ,the connection is considered offline
  }
  timer = 10;
  clearInterval(inIntervalId);
  handlePopup(isOnline);
}
const handlePopup = (status) => {
  if (status) { // If the status is true (online)
    wifiIcon.className = 'uil uil-wifi';
    popupTitle.innerText = 'Restored Connection';
    popupDesc.innerHTML = 'Your device is now successfully connected to the internet. ';
    popup.classList.add("online");
    return setTimeout(() => popup.classList.remove("show"), 2000);
  }
  // If the status is false (offline)
  wifiIcon.className = 'uil uil-wifi-slash';
  popupTitle.innerText = 'Lost Connection';
  popupDesc.innerHTML = 'Your Network is unavilable. We will attempt to reconnect you in <b>10</b> seconds.';
  popup.className = "popup show";

  inIntervalId = setInterval(() => { // Set an interval to decrease the timer by 1 every second
    timer--;
    if (timer === 0) checkConnection();
    popup.querySelector('.desc b').innerText = timer;
  }, 1000);
}
// Only if isOnline id true, Check the connection statues every 3 seconds
setInterval(() => isOnline && checkConnection(), 3000);
reconnectBtn.addEventListener("click", checkConnection);