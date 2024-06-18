import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';

const Orçamentos = ({ orcamentoMensalProp, gastosMensaisProp }) => {
  const [orcamentoMensal, setOrcamentoMensal] = useState(orcamentoMensalProp ? orcamentoMensalProp.toString() : '');
  const [gastosMensais, setGastosMensais] = useState(gastosMensaisProp ? gastosMensaisProp.toString() : '');

  const percentualGastos = (parseFloat(gastosMensais) / parseFloat(orcamentoMensal)) * 100;
  let status = '';

  if (!orcamentoMensal || !gastosMensais) {
    status = 'Preencha os valores';
  } else if (percentualGastos <= 90) {
    status = 'Dentro do Orçamento';
  } else if (percentualGastos > 90 && percentualGastos <= 100) {
    status = 'Arriscado';
  } else {
    status = 'Acima do Orçamento';
  }

  return (
    <View>
      <Text>Orçamento Mensal:</Text>
      <TextInput
        style={{ borderWidth: 1, borderColor: 'black', marginBottom: 10 }}
        value={orcamentoMensal}
        onChangeText={setOrcamentoMensal}
        keyboardType="numeric"
      />
      <Text>Gastos Mensais:</Text>
      <TextInput
        style={{ borderWidth: 1, borderColor: 'black', marginBottom: 10 }}
        value={gastosMensais}
        onChangeText={setGastosMensais}
        keyboardType="numeric"
      />
      <Text>Status: {status}</Text>
    </View>
  );
};

export default Orçamentos;