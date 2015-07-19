const int ledPin = 2;
String incoming;
int recievedCode = 0;

void setup() {
  pinMode(ledPin, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  while (Serial.available()) {          
    incoming = Serial.readString();
    recievedCode = incoming.toInt();
  }

  switch (recievedCode) {
    case 1:
      digitalWrite(ledPin, HIGH);
      Serial.println("ARDUINO: LED ON");
      recievedCode = 0;
      break;
    case 2:
      digitalWrite(ledPin, LOW);
      Serial.println("ARDUINO: LED OFF");
      recievedCode = 0;
      break;
    default:
      break;
  }
}
