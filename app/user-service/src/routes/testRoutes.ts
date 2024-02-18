import express from 'express';
import { publishMessage } from '../rabbitmq/publish'; 
import { errorMessage } from '../utils/errorMessage'
const router = express.Router();

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
router.get('/user-service/test-message', (req, res) => {
  res.status(200).send('Hello from the user service')
})

router.post('/user-service/local', (req, res) => {
  const payload = req.body
  res.send(payload)
})
export default router;
