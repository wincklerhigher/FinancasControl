import React, { useState, useEffect, useCallback } from 'react';
import { Text } from 'react-native';
import { TextInput, Card, Paragraph, Button, ProgressBar, Provider as PaperProvider } from 'react-native-paper';
import { insertTransaction } from '../database'; 
import { format } from 'date-fns';

const Orcamentos = ({ orcamentoMensalProp, gastosMensaisProp }) => {
  const [orcamentoMensal, setOrcamentoMensal] = useState(orcamentoMensalProp ? orcamentoMensalProp.toString() : '');
  const [gastosMensais, setGastosMensais] = useState(gastosMensaisProp ? gastosMensaisProp.toString() : '');
  const [status, setStatus] = useState('');
  const [percentualGastos, setPercentualGastos] = useState(0);

  const updateStatus = useCallback(() => {
    const orcamento = parseFloat(orcamentoMensal);
    const gastos = parseFloat(gastosMensais);

    if (isNaN(orcamento) || isNaN(gastos) || orcamento <= 0) {
      setStatus('Preencha os valores corretamente');
      setPercentualGastos(0);
    } else {
      const percentual = (gastos / orcamento) * 100;
      setPercentualGastos(percentual);

      if (percentual <= 90) {
        setStatus('Dentro do Orçamento');
      } else if (percentual > 90 && percentual <= 100) {
        setStatus('Arriscado');
      } else {
        setStatus('Acima do Orçamento');
      }
    }
  }, [orcamentoMensal, gastosMensais]);

  useEffect(() => {
    updateStatus();
  }, [orcamentoMensal, gastosMensais, updateStatus]);

  const handleSave = () => {
    if (!orcamentoMensal || !gastosMensais || parseFloat(orcamentoMensal) <= 0 || parseFloat(gastosMensais) <= 0) {
      alert('Por favor, preencha os valores corretamente.');
      return;
    }

    insertTransaction('Orçamento Mensal', parseFloat(gastosMensais), 'Orçamento', format(new Date(), 'dd/MM/yyyy'), 'Orçamento')
      .then(insertId => {
        alert(`Transação salva com sucesso! ID da transação: ${insertId}`);
        console.log('Transaction ID:', insertId);

        setOrcamentoMensal('');
        setGastosMensais('');
        setStatus('');
        setPercentualGastos(0);
      })
      .catch(error => {
        console.error('Erro ao salvar transação:', error);
        alert('Erro ao salvar transação. Por favor, tente novamente.');
      });
  };

  return (
    <PaperProvider>
      <Card style={{ margin: 20 }}>
        <Card.Content>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Orçamento Mensal:</Text>
          <TextInput
            style={{ marginBottom: 10 }}
            value={orcamentoMensal}
            onChangeText={setOrcamentoMensal}
            keyboardType="numeric"
            placeholder="Digite o orçamento mensal"
            accessible
            accessibilityLabel="Orçamento Mensal"
          />
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Gastos Mensais:</Text>
          <TextInput
            style={{ marginBottom: 10 }}
            value={gastosMensais}
            onChangeText={setGastosMensais}
            keyboardType="numeric"
            placeholder="Digite os gastos mensais"
            accessible
            accessibilityLabel="Gastos Mensais"
          />
          <Paragraph>Status: {status}</Paragraph>
          <ProgressBar progress={percentualGastos / 100} color={percentualGastos <= 90 ? 'green' : percentualGastos <= 100 ? 'orange' : 'red'} style={{ marginTop: 10 }} />
        </Card.Content>
        <Card.Actions>
          <Button mode="contained" onPress={handleSave} style={{ flex: 1, marginBottom: 10 }} accessible accessibilityLabel="Salvar">
            Salvar
          </Button>
        </Card.Actions>
      </Card>
    </PaperProvider>
  );
};

export default Orcamentos;