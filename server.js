
const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");

const PROTO_PATH = "messaging.proto";
const SERVER_URI = "https://demo.persol-apps.com/LMS";

const usersInChat = [];
const observers = [];
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);



const SendExternalMessage = (call, callback) => {
    const chatObj = call.request;
    observers.forEach((observer) => {
      observer.call.write(chatObj);
    });
    callback(null, {});
  };


  const server = new grpc.Server();

  server.addService(protoDescriptor.ChatService.service, {
    SendExternalMessage
  });

  server.bind(SERVER_URI, grpc.ServerCredentials.createInsecure());

  server.start();
console.log({server: "Server is running!"});
  