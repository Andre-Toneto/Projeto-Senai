
// const fs = require('fs');
// const path = require('path');

// // Altere aqui o caminho da pasta que você quer escanear:
// const PASTA_LOCAL = 'C:\\Users\\Andre Toneto\\Desktop\\Estudos excel';
// const OUTPUT_JSON = path.join(__dirname, 'public', 'arquivos.json');

// function listarArquivos(diretorio, raiz = '') {
//   const arquivos = [];

//   fs.readdirSync(diretorio).forEach(item => {
//     const caminhoCompleto = path.join(diretorio, item);
//     const stats = fs.statSync(caminhoCompleto);

//     if (stats.isFile()) {
//       const caminhoRelativo = path.join(raiz, item).replace(/\\/g, '/');

//       arquivos.push({
//         nome: item,
//         caminho: `file:///${path.join(diretorio, item).replace(/\\/g, '/')}`,
//         tipo: path.extname(item).replace('.', '').toUpperCase(),
//         tamanho: `${(stats.size / 1024).toFixed(1)} KB`,
//       });
//     } else if (stats.isDirectory()) {
//       const subArquivos = listarArquivos(caminhoCompleto, path.join(raiz, item));
//       arquivos.push(...subArquivos);
//     }
//   });

//   return arquivos;
// }

// const lista = listarArquivos(PASTA_LOCAL);

// fs.writeFileSync(OUTPUT_JSON, JSON.stringify(lista, null, 2), 'utf-8');

// console.log(`✅ Gerado com sucesso: ${lista.length} arquivos em arquivos.json`);

// gerar-arquivos.js

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// Emular __dirname no ES Module
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Caminho da pasta que você quer escanear:
const PASTA_LOCAL = 'C:\\Users\\Andre Toneto\\Desktop\\Estudos excel'
const OUTPUT_JSON = path.join(__dirname, 'public', 'arquivos.json')

function listarArquivos(diretorio, raiz = '') {
  const arquivos = []

  fs.readdirSync(diretorio).forEach(item => {
    const caminhoCompleto = path.join(diretorio, item)
    const stats = fs.statSync(caminhoCompleto)

    if (stats.isFile()) {
      const caminhoRelativo = path.join(raiz, item).replace(/\\/g, '/')

      arquivos.push({
        nome: item,
        caminho: `file:///${path.join(diretorio, item).replace(/\\/g, '/')}`,
        tipo: path.extname(item).replace('.', '').toUpperCase(),
        tamanho: `${(stats.size / 1024).toFixed(1)} KB`,
      })
    } else if (stats.isDirectory()) {
      const subArquivos = listarArquivos(caminhoCompleto, path.join(raiz, item))
      arquivos.push(...subArquivos)
    }
  })

  return arquivos
}

const lista = listarArquivos(PASTA_LOCAL)

fs.writeFileSync(OUTPUT_JSON, JSON.stringify(lista, null, 2), 'utf-8')

console.log(`✅ Gerado com sucesso: ${lista.length} arquivos em arquivos.json`)
