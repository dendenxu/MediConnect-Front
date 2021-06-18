const socket = new WebSocket(
  `ws://${process.env.REACT_APP_BACKEND_API_HOST}/api/doctor/111/chat`,
);

const socketPatient = new WebSocket(
  `ws://${process.env.REACT_APP_BACKEND_API_HOST}/api/patient/111/chat`,
);

const connect = cb => {
  console.log('Connecting');

  socket.onopen = () => {
    console.log('Successfully Connected');
  };

  socket.onmessage = msg => {
    console.log(msg);
    // const dataFromServer = JSON.parse(msg.data);
    // console.log(dataFromServer);
    // console.log("Type:", dataFromServer.Type);
    // console.log("Role:", dataFromServer.Role);
    // console.log("Name:", dataFromServer.Name);
    // console.log("SenderID:", dataFromServer.SenderID);
    // console.log("ReceiverID:", dataFromServer.ReceiverID);
    // console.log("Content:", dataFromServer.Content);
    // console.log("Time:", dataFromServer.Time);
    // console.log("URL:", dataFromServer.URL);
    // console.log("Questions:", dataFromServer.Questions);

    // console.log("type:",dataFromServer.type);
    // console.log("body:",dataFromServer.body);
    // console.log("username:",dataFromServer.body[1]);
    // const message = dataFromServer.Content;
    // cb(dataFromServer.Content);
    cb(msg);
    // cb(msg);
  };

  socket.onclose = event => {
    console.log('Socket Closed Connection: ', event);
  };

  socket.onerror = error => {
    console.log('Socket Error: ', error);
  };
};

const hello = (role, myID) => {
  const json = {
    Type: 0,
    Role: role,
    MyID: myID,
  };
  console.log('json from hello:', json);
  socket.send(JSON.stringify(json));
};

const msgFromClient = (senderID, receiverID, content, time) => {
  const json = {
    Type: 1,
    SenderID: senderID,
    ReceiverID: receiverID,
    Content: content,
    Time: time,
  };
  console.log('json from msgFromClient:', json);
  socket.send(JSON.stringify(json));
};

const closeChat = (patientID, doctorID) => {
  const json = {
    Type: 2,
    ReceiverID: patientID,
    // DoctorID: doctorID,
  };
  console.log('json from closeChat:', json);
  socket.send(JSON.stringify(json));
};

const requireMedicalRecord = (patientID, doctorID) => {
  const json = {
    Type: 3,
    DoctorID: doctorID,
    PatientID: patientID,
  };
  console.log('json from requireMedicalRecord:', json);
  socket.send(JSON.stringify(json));
};

const requirePrescription = (patientID, doctorID) => {
  const json = {
    Type: 4,
    DoctorID: doctorID,
    PatientID: patientID,
  };
  console.log('json from requirePrescription:', json);
  socket.send(JSON.stringify(json));
};

const requireQuestions = doctorID => {
  const json = {
    Type: 5,
    DoctorID: doctorID,
  };
  console.log('json from requireQuestions:', json);
  socket.send(JSON.stringify(json));
};

// const sendMsg = msg => {
//     var let = "flora";
//     console.log("sending msg: ", msg);
//     // socket.send(msg);
//     // socket.send(JSON.stringify({
//     //     type: "try",
//     //     username: "flora",
//     //     content: msg
//     //   }));
//     const json = {type:"tryhhh"};
//     json.username = username;
//     json.data = {username, msg};
//     // socket.send(JSON.stringify({
//     //     type: "try",
//     //     username: "flora",
//     //     content: msg
//     //   }));
//     console.log("json:", json);
//     socket.send(JSON.stringify(json));
// };
// connection.on('message', function(message) {
//     if (message.type === 'utf8') {
//       const dataFromClient = JSON.parse(message.utf8Data);
//       const json = { type: dataFromClient.type };
//       if (dataFromClient.type === typesDef.USER_EVENT) {
//         users[userID] = dataFromClient;
//         userActivity.push(`${dataFromClient.username} joined to edit the document`);
//         json.data = { users, userActivity };
//       } else if (dataFromClient.type === typesDef.CONTENT_CHANGE) {
//         editorContent = dataFromClient.content;
//         json.data = { editorContent, userActivity };
//       }
//       sendMessage(JSON.stringify(json));
//     }
//   });

export {
  socket,
  socketPatient,
  connect,
  hello,
  msgFromClient,
  closeChat,
  requireMedicalRecord,
  requirePrescription,
  requireQuestions,
};
