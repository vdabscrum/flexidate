
window.onload = function(){
  //let aMensen = createFeed(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
  //let Paul = "56cae42a683485281caf5652";
  //sendMessage("56cae42a683485281caf5656", "Hoe gaat het?", Paul);
  //sendMessage("56cae42a683485281caf5655", "Cv?", Paul);
  //  blindDate("56cae42a683485281caf5656", "Hoe gaat het?",aMensen);
  //let berichten = loadMessages(Paul);
  //alert("U heeft " + berichten.length + " berichten.");
  //for (i=0; i < berichten.length; i++){
    //showMessage(berichten[i]);
  //}
  // blindDate

}

//24 is de lengte van id

function sendMessage(zenderId, msg, ontvangerId)
{
  let combinedMsg = zenderId + msg;
  saveMessage(combinedMsg, ontvangerId);
}

function saveMessage(msg, ontvangerId)
{
  let index = 100000 + localStorage.length;
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
  let eP = document.createElement('p');
  eP.innerHTML = message;
  eDiv.appendChild(eP);
  document.getElementById("inbox").appendChild(eDiv);
}

function blindDate(zender, msg, aPeople)
{
    let ontvanger = aPeople[Math.floor(Math.random() * aPeople.length)];
    sendMessage(zender, msg, ontvanger._id);
}
