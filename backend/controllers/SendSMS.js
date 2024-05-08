const axios = require('axios');

async function sendNotification(recipient, message) {
  const baseUrl = 'https://app.notify.lk/api/v1/send';
  const userId = '26950';
  const apiKey = '3weK1k8orjXuV7cXUlPL';
  const senderId = 'NotifyDEMO';
  try {
    const response = await axios.get(baseUrl, {
      params: {
        user_id: userId,
        api_key: apiKey,
        sender_id: senderId,
        to: recipient,
        message: message
      }
    });

    console.log('Notification sent:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error sending notification:', error);
    throw error; // or handle error as needed
  }
}


module.exports = {
  sendNotification
}