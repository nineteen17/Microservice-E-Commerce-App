import express from 'express';
import { publishMessage } from '../rabbitmq/rabbitmq'; 
import { errorMessage } from '../utils/utils'
const router = express.Router();

// Route to handle publishing a message
router.post('/user-service/test-message', async (req, res) => {
  const messagePayload = req.body;
  console.log(`Message Recived: ${messagePayload}`);
  
  try {
    await publishMessage('user-exchange', 'user-message', messagePayload);
    res.status(200).send({ message: 'Message published successfully', data: messagePayload});
  } catch (err) {
    console.error('Error in publishing message:', errorMessage(err));
    res.status(500).json({ error: `Error in publishing message: ${errorMessage(err)}`});
  }
});

export { router };