const XLSX = require('xlsx');
const fs = require('fs');

try {
  // Ler o arquivo Excel
  const workbook = XLSX.readFile('planilha_alunos.xlsx');
  
  console.log('Planilhas disponíveis:', workbook.SheetNames);
  
  // Analisar cada planilha
  workbook.SheetNames.forEach((sheetName, index) => {
    console.log(`\n=== PLANILHA ${index + 1}: ${sheetName} ===`);
    
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet);
    
    console.log(`Total de registros: ${data.length}`);
    
    if (data.length > 0) {
      console.log('Colunas disponíveis:', Object.keys(data[0]));
      console.log('\nPrimeiros 3 registros:');
      data.slice(0, 3).forEach((row, i) => {
        console.log(`Registro ${i + 1}:`, row);
      });
    }
    
    // Salvar dados em JSON para análise
    fs.writeFileSync(`planilha_${sheetName.replace(/[^a-zA-Z0-9]/g, '_')}.json`, JSON.stringify(data, null, 2));
    console.log(`Dados salvos em: planilha_${sheetName.replace(/[^a-zA-Z0-9]/g, '_')}.json`);
  });
  
} catch (error) {
  console.error('Erro ao processar planilha:', error.message);
}
