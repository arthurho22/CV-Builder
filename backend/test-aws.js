const { DynamoDBClient, ListTablesCommand } = require('@aws-sdk/client-dynamodb');
require('dotenv').config();

const client = new DynamoDBClient({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

async function testAWS() {
  try {
    const command = new ListTablesCommand({});
    const response = await client.send(command);
    console.log('✅ Credenciais AWS VÁLIDAS!');
    console.log('📋 Tabelas no DynamoDB:', response.TableNames);
  } catch (error) {
    console.log('❌ Erro nas credenciais AWS:');
    console.log('Mensagem:', error.message);
    
    if (error.name === 'CredentialsProviderError') {
      console.log('\n🔑 Problema nas credenciais:');
      console.log('- Verifique se AWS_ACCESS_KEY_ID está correto');
      console.log('- Verifique se AWS_SECRET_ACCESS_KEY está correto');
      console.log('- Verifique se as credenciais não expiraram');
    }
  }
}

testAWS();