import TelegramBot from 'node-telegram-bot-api';
import fs from 'fs';
import schedule from 'node-schedule';
import dotenv from "dotenv";

dotenv.config();

// Replace with your Telegram bot token
const token = process.env.TELEGRAM_BOT_TOKEN2;
const bot2 = new TelegramBot(token, { polling: true });

// Suppress specific error message
bot2.on('polling_error', (error) => {
  if (error.code === 'ETELEGRAM' && error.message.includes('409 Conflict')) {
    // Ignore this specific error
    return;
  }
  console.error('Polling error:', error);
});

// Path to the file containing english words
const wordsFilePath = './uploads/english_words.txt';

// Load English words from the file
let englishWords = [];
let currentIndex = 0;

fs.readFile(wordsFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading english words file:', err);
    return;
  }
  englishWords = data.split('\n').map(word => word.trim() || ' ');
  
  // Send the first set of words immediately after loading the file
  sendWords();
});

// Function to get the next 9 English words sequentially
const getNextWords = (count = 9) => {
  const words = [];
  for (let i = 0; i < count; i++) {
    words.push(englishWords[currentIndex]);
    currentIndex = (currentIndex + 1) % englishWords.length; // Increment and wrap around
  }
  return words;
};

// Replace with your channel or group ID
const chatId = process.env.TELEGRAM_CHANNEL_ID2;

// Function to send 9 english words
const sendWords = () => {
  const words = getNextWords(9).map(word => `*${word}*`).join('\n'); // Make each word bold
  bot.sendMessage(chatId, `Bu günün sözləri:\n\n${words}`, { parse_mode: 'Markdown' });
};

// Schedule the job to send words every 8 hour
const job = schedule.scheduleJob('0 */8 * * *', sendWords);

console.log('Bot2 is running...');