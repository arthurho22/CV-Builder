const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, PutCommand, GetCommand, ScanCommand, UpdateCommand, DeleteCommand } = require('@aws-sdk/lib-dynamodb');

const app = express();
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true
}));

const PORT = process.env.PORT || 5000;

const client = new DynamoDBClient({
  region: 'us-east-1',
  credentials: {
    accessKeyId: 'AKIAXBRSVMNWRLWCZ57M',        
    secretAccessKey: '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' 
  }
});
console.log('✅ Cliente DynamoDB configurado!');


const docClient = DynamoDBDocumentClient.from(client);
const TABLE_NAME = 'Curriculos';

app.use(cors());
app.use(express.json());

app.get('/api/curriculos', async (req, res) => {
  try {
    const command = new ScanCommand({ TableName: TABLE_NAME });
    const result = await docClient.send(command);
    res.json(result.Items || []);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/curriculos/:id', async (req, res) => {
  try {
    const command = new GetCommand({
      TableName: TABLE_NAME,
      Key: { id: req.params.id }
    });
    
    const result = await docClient.send(command);
    
    if (!result.Item) {
      return res.status(404).json({ message: 'Currículo não encontrado' });
    }
    
    res.json(result.Item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/curriculos', async (req, res) => {
  try {
    const curriculo = {
      id: Date.now().toString(),
      ...req.body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const command = new PutCommand({
      TableName: TABLE_NAME,
      Item: curriculo
    });

    await docClient.send(command);
    res.status(201).json(curriculo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.put('/api/curriculos/:id', async (req, res) => {
  try {
    const updateExpression = [];
    const expressionAttributeNames = {};
    const expressionAttributeValues = {};
    
    Object.keys(req.body).forEach((key, index) => {
      updateExpression.push(`#${key} = :${key}`);
      expressionAttributeNames[`#${key}`] = key;
      expressionAttributeValues[`:${key}`] = req.body[key];
    });
    
    updateExpression.push(`#updatedAt = :updatedAt`);
    expressionAttributeNames['#updatedAt'] = 'updatedAt';
    expressionAttributeValues[':updatedAt'] = new Date().toISOString();

    const command = new UpdateCommand({
      TableName: TABLE_NAME,
      Key: { id: req.params.id },
      UpdateExpression: `SET ${updateExpression.join(', ')}`,
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: 'ALL_NEW'
    });

    const result = await docClient.send(command);
    
    if (!result.Attributes) {
      return res.status(404).json({ message: 'Currículo não encontrado' });
    }
    
    res.json(result.Attributes);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete('/api/curriculos/:id', async (req, res) => {
  try {
    const command = new DeleteCommand({
      TableName: TABLE_NAME,
      Key: { id: req.params.id },
      ReturnValues: 'ALL_OLD'
    });

    const result = await docClient.send(command);
    
    if (!result.Attributes) {
      return res.status(404).json({ message: 'Currículo não encontrado' });
    }
    
    res.json({ message: 'Currículo deletado com sucesso', deletedItem: result.Attributes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api', (req, res) => {
  res.json({ message: 'API do CV Builder funcionando!' });
});

app.listen(PORT, () => {
  console.log('Servidor rodando na porta ' + PORT);
});