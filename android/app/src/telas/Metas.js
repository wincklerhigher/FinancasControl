import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { TextInput, Card, Button, ProgressBar, Provider as PaperProvider } from 'react-native-paper';

const Metas = () => {
  const [produto, setProduto] = useState('');
  const [valorProduto, setValorProduto] = useState('');
  const [dinheiroAtual, setDinheiroAtual] = useState('');
  const [progresso, setProgresso] = useState(0);

  const definirMeta = () => {
    const valorMeta = parseFloat(valorProduto);
    const dinheiro = parseFloat(dinheiroAtual);
    
    if (!isNaN(valorMeta) && valorMeta > 0 && !isNaN(dinheiro) && dinheiro >= 0) {
      const progressoAtual = (dinheiro / valorMeta) * 100;
      setProgresso(progressoAtual);
    } else {
      alert('Por favor, insira valores válidos para o produto e o dinheiro atual.');
    }
  };

  return (
    <PaperProvider>
      <View style={{ padding: 20 }}>
        <Card style={{ marginVertical: 10 }}>
          <Card.Content>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Metas Financeiras</Text>
            <TextInput
              label="Produto desejado"
              value={produto}
              onChangeText={setProduto}
              style={{ marginBottom: 10 }}
            />
            <TextInput
              label="Valor do produto"
              value={valorProduto}
              onChangeText={setValorProduto}
              keyboardType="numeric"
              style={{ marginBottom: 10 }}
            />
            <TextInput
              label="Dinheiro atual na carteira"
              value={dinheiroAtual}
              onChangeText={setDinheiroAtual}
              keyboardType="numeric"
              style={{ marginBottom: 10 }}
            />
            <Button mode="contained" onPress={definirMeta} style={{ marginBottom: 10 }}>
              Definir Meta
            </Button>
            <Text style={{ marginTop: 10 }}>Progresso: {progresso.toFixed(2)}%</Text>
            <ProgressBar progress={progresso / 100} color={progresso >= 100 ? 'green' : 'blue'} style={{ marginTop: 10 }} />
          </Card.Content>
        </Card>
      </View>
    </PaperProvider>
  );
};

export default Metas;