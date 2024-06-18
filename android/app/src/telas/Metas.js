import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

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
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Metas Financeiras</Text>
      <TextInput
        style={{ marginBottom: 10, borderWidth: 1, borderColor: 'black', padding: 5 }}
        placeholder="Produto desejado"
        value={produto}
        onChangeText={setProduto}
      />
      <TextInput
        style={{ marginBottom: 10, borderWidth: 1, borderColor: 'black', padding: 5 }}
        placeholder="Valor do produto"
        value={valorProduto}
        onChangeText={setValorProduto}
        keyboardType="numeric"
      />
      <TextInput
        style={{ marginBottom: 10, borderWidth: 1, borderColor: 'black', padding: 5 }}
        placeholder="Dinheiro atual na carteira"
        value={dinheiroAtual}
        onChangeText={setDinheiroAtual}
        keyboardType="numeric"
      />
      <Button title="Definir Meta" onPress={definirMeta} />
      <Text style={{ marginTop: 10 }}>Progresso: {progresso.toFixed(2)}%</Text>
    </View>
  );
};

export default Metas;