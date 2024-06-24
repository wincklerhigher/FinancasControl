import React, { useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { TextInput, Card, Button, IconButton, Provider as PaperProvider } from 'react-native-paper';
import { useTransactionContext } from '../TransacaoComponent';
import styles from '../styles/FinancasStyle';

const RelatorioContas = () => {
  const { transactions, setTransactions } = useTransactionContext();
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleAdicionarGasto = () => {
    let categoriaTransacao = parseFloat(valor) < 0 ? 'Despesa' : 'Receita';

    if (descricao && valor) {
      const newTransaction = { id: Date.now(), description: descricao, amount: valor, category: categoriaTransacao };
      setTransactions(prevTransactions => [...prevTransactions, newTransaction]);
      setDescricao('');
      setValor('');
    }
  };

  const handleExcluirGasto = (id) => {
    const updatedTransactions = transactions.filter(transaction => transaction.id !== id);
    setTransactions(updatedTransactions);
  };

  const handleEditarGasto = (id) => {
    const transactionToEdit = transactions.find(transaction => transaction.id === id);
    setDescricao(transactionToEdit.description);
    setValor(transactionToEdit.amount.toString());
    setEditingId(id);
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    const updatedTransactions = transactions.map(transaction => {
      if (transaction.id === editingId) {
        let categoriaTransacao = parseFloat(valor) < 0 ? 'Despesa' : 'Receita';
        return { ...transaction, description: descricao, amount: valor, category: categoriaTransacao };
      }
      return transaction;
    });
    setTransactions(updatedTransactions);
    setDescricao('');
    setValor('');
    setEditingId(null);
    setIsEditing(false);
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Card style={styles.card}>
          <Card.Content>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Relatórios</Text>
            <TextInput
              label="Descrição"
              value={descricao}
              onChangeText={setDescricao}
              style={[styles.textInput, { marginBottom: 10 }]} 
            />
            <TextInput
              label="Valor"
              value={valor}
              onChangeText={setValor}
              keyboardType="numeric"
              style={[styles.textInput, { marginBottom: 10 }]} 
            />
            {!isEditing ? (
              <Button mode="contained" onPress={handleAdicionarGasto} style={styles.button}>
                Adicionar
              </Button>
            ) : (
              <Button mode="contained" onPress={handleSaveEdit} style={styles.button}>
                Salvar Edição
              </Button>
            )}
          </Card.Content>
        </Card>
        <FlatList
          data={transactions}
          renderItem={({ item }) => (
            <Card style={styles.card}>
              <Card.Content style={styles.cardContentWithMargin}>
                <Text style={styles.descriptionText}>Descrição: {item.description}</Text>
                <Text style={styles.amountText}>Valor: {item.amount}</Text>
                <Text style={styles.categoryText}>Categoria: {item.category}</Text>
                <View style={styles.buttonContainer}>
                  <IconButton
                    icon="delete"
                    onPress={() => handleExcluirGasto(item.id)}                    
                    style={styles.iconButton}
                  />
                  <IconButton
                    icon="pencil"
                    onPress={() => handleEditarGasto(item.id)}                    
                    style={styles.iconButton}
                  />
                </View>
              </Card.Content>
            </Card>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </PaperProvider>
  );
};

export default RelatorioContas;