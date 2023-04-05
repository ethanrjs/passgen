// Importing required modules
const { performance } = require('perf_hooks');
const crypto = require('crypto');

// Helper functions
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

class OpaquePasswordGenerator {
  constructor() {
    this.characters = "abcdefghijklmnopqrstuvwxyz";
    this.specialChars = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '=', '+', '[', ']', '{', '}', '|', '\\', ';', ':', '\'', '\"', ',', '.', '/', '<', '>', '?'];
  }

  secretGeneratePassword(length) {
    let password = '';
    for (let i = 0; i < length; i++) {
      let randomCharacter = this.characters[getRandomInt(0, this.characters.length - 1)];
      password += Math.random() < 0.5 ? randomCharacter.toUpperCase() : randomCharacter;
    }
    return password;
  }

  _addSpecialCharacters(password) {
    let newPassword = '';
    for (let i = 0; i < password.length; i++) {
      newPassword += password[i];
      if (Math.random() < 0.5) {
        newPassword += this.specialChars[getRandomInt(0, this.specialChars.length - 1)];
      }
    }
    return newPassword;
  }

  generatePassword(length) {
    const password = this.secretGeneratePassword(length);
    return this._addSpecialCharacters(password);
  }
}

class PasswordGeneratorWrapper {
  constructor(arg1, arg2) {
    this.arg1 = arg1;
    this.arg2 = arg2;
    this.generator = new OpaquePasswordGenerator();
  }

  validateArguments() {
    if (isNaN(this.arg1) || isNaN(this.arg2)) {
      throw new Error("Usage: node passgen.js <arg1> <arg2>...");
    }
  }

  execute() {
    this.validateArguments();
    const startTime = performance.now();

    for (let i = 0; i <= this.arg2; i++) {
      console.log('\n' + this.generator.generatePassword(this.arg1) + '\n');
    }

    const endTime = performance.now();
    const elapsedTime = endTime - startTime;
    console.log(`\nElapsed time: ${elapsedTime.toFixed(3)} milliseconds\n`);
  }
}

// Main program
const args = process.argv.slice(2);
const passwordGenerator = new PasswordGeneratorWrapper(parseInt(args[0]), parseInt(args[1]));
passwordGenerator.execute();
