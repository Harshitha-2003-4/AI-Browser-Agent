import { exec } from "child_process";
import * as crypto from "crypto";

// Hardcoded credentials
const AWS_SECRET_ACCESS_KEY = "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY";
const DB_PASSWORD = "SuperSecret123!";

// Code injection
export function calc(userInput: string) {
  return eval(userInput);
}

// Command injection
export function run(userInput: string) {
  exec("ls " + userInput);
}

// DOM XSS
export function render(userHtml: string) {
  document.body.innerHTML = userHtml;
  document.write(userHtml);
}

// Weak hash
export function hash(data: string) {
  return crypto.createHash("md5").update(data).digest("hex");
}

// SQL injection
export function findUser(db: any, name: string) {
  return db.query("SELECT * FROM users WHERE name = '" + name + "'");
}
