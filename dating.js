
window.onload = function(){
  let Paul = "56cae42a683485281caf5652"
  sendMessage("56cae42a683485281caf5656", "Hoe gaat het?", Paul);
  sendMessage("56cae42a683485281caf5655", "Cv?", Paul);
  let berichten = loadMessages(Paul);
  alert("U heeft " + berichten.length + " berichten.");
  for (i=0; i < berichten.length; i++){
    showMessage(berichten[i]);
  }
}

//24 is de lengte van id

function sendMessage(zenderId, msg, ontvangerId)
{
  let combinedMsg = zenderId + msg;
  saveMessage(combinedMsg, ontvangerId);

}

function saveMessage(msg, ontvangerId)
{
  index = 100000 + localStorage.length;
  localStorage.setItem(index + ontvangerId, msg);
}

function loadMessages(gebruikerId)
{
  let messages = [];
  for (let i = 0; i < localStorage.length; i++) {
    let tempKey = localStorage.key(i);
    if (tempKey.substring(6) == gebruikerId )
      messages.push(localStorage.getItem(tempKey));
    }

  return messages;
}

function showMessage(msg) {
  let senderId = msg.substring(0, 24);
  let message = msg.substring(24);

  let senderNickname = scrumlib.getDatasetById(senderId)[0].nickname;

  let eDiv = document.createElement('div');
  let eLink = document.createElement('a');
  eLink.href = "#";
  eLink.id = senderId;
  eLink.innerHTML = senderNickname + ' ';
  eDiv.appendChild(eLink);
  eP = document.createElement('p');
  eP.innerHTML = message;
  eDiv.appendChild(eP);
  document.getElementById("inbox").appendChild(eDiv);
}
