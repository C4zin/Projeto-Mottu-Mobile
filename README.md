### MotoTrack

## 👨‍💻 Autores

RM558317 - Cauã Sanches de Santana -  
Git: C4zin

RM556511 - Angello Turano da Costa -
Git: AngelloTDC


RM558576 - Leonardo Bianchi -  
Git: leonardobianchii

## Descrição

O Moto Manager é um aplicativo móvel desenvolvido com React Native e Expo para gerenciamento de motocicletas no pátio. Ele permite o cadastro, visualização, atualização de status e localização de motos em um mapa de pátio virtual.


# 🏍️ Moto Manager

Um aplicativo mobile moderno e elegante para gerenciamento de motocicletas em pátios, desenvolvido com **React Native**, **Expo** e **Firebase**.

![Moto Manager](https://img.shields.io/badge/React%20Native-0.72.6-blue?style=for-the-badge&logo=react)
![Firebase](https://img.shields.io/badge/Firebase-10.7.1-orange?style=for-the-badge&logo=firebase)
![Expo](https://img.shields.io/badge/Expo-49.0.15-black?style=for-the-badge&logo=expo)
![TypeScript](https://img.shields.io/badge/TypeScript-5.1.3-blue?style=for-the-badge&logo=typescript)

## 📱 Sobre o Projeto

O **Moto Manager** é uma solução completa para empresas que precisam gerenciar frotas de motocicletas. Com uma interface moderna e intuitiva, o aplicativo permite controlar o status, localização e informações detalhadas de cada veículo em tempo real.

### ✨ Principais Características

- 🔐 **Autenticação Segura** com Firebase Authentication
- 🎨 **Design Moderno** com paleta azul profissional
- 🌙 **Tema Escuro/Claro** com persistência de preferências
- 📱 **Interface Responsiva** otimizada para diferentes tamanhos de tela
- 💾 **Armazenamento Local** com AsyncStorage
- 🗺️ **Mapa Visual** do pátio com localização em tempo real

## 🚀 Funcionalidades

### 🔑 Sistema de Autenticação
- **Login Seguro**: Autenticação via email e senha
- **Registro de Usuários**: Criação de contas com validação
- **Persistência de Sessão**: Login automático
- **Logout Seguro**: Encerramento de sessão protegido

### 🏠 Dashboard Principal
- **Estatísticas em Tempo Real**: Total de motos, disponíveis, em manutenção
- **Últimas Atividades**: Histórico de acessos
- **Navegação Rápida**: Acesso direto às principais funcionalidades
- **Cards Informativos**: Visualização clara dos dados

### 🏍️ Gerenciamento de Motocicletas

#### Cadastro Completo
- **Informações Básicas**: Modelo, placa, ano, cor
- **Status Dinâmico**: Disponível, Em Uso, Manutenção, Reservada
- **Posicionamento**: Localização no pátio (fileira e vaga)
- **Observações**: Campo livre para anotações
- **Pré-visualização**: Confirmação antes do cadastro

#### Controle de Status
- **Alteração Rápida**: Mudança de status com um toque
- **Histórico**: Registro de todas as alterações
- **Validações**: Prevenção de conflitos de status

### 🗺️ Mapa do Pátio

#### Visualização Interativa
- **Grid Visual**: Representação clara das vagas (A1-E10)
- **Código de Cores**: Status visual imediato
- **Seleção de Vagas**: Toque para ver detalhes
- **Legenda Completa**: Explicação de todos os status

#### Informações Detalhadas
- **Detalhes da Vaga**: Informações completas ao selecionar
- **Navegação Direta**: Acesso rápido aos detalhes da moto
- **Status em Tempo Real**: Atualização automática

### 📋 Detalhes da Motocicleta

#### Informações Completas
- **Dados Técnicos**: Modelo, placa, ano, cor
- **Localização**: Posição exata no pátio
- **Data de Cadastro**: Histórico de registro
- **Observações**: Notas e comentários

#### Ações Disponíveis
- **Alteração de Status**: Mudança rápida entre estados
- **Edição**: Modificação de informações
- **Exclusão**: Remoção com confirmação
- **Histórico**: Visualização de alterações

### ⚙️ Configurações

#### Personalização
- **Tema**: Alternância entre claro e escuro
- **Preferências**: Salvamento automático das configurações

#### Informações do Sistema
- **Versão do App**: Controle de versioning
- **Estatísticas**: Dados de uso
- **Último Acesso**: Histórico de utilização

#### Gerenciamento de Dados
- **Backup Local**: Armazenamento seguro
- **Limpeza de Dados**: Remoção com confirmação
- **Logout**: Encerramento seguro da sessão

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React Native** 0.72.6 - Framework principal
- **Expo** 49.0.15 - Plataforma de desenvolvimento
- **TypeScript** 5.1.3 - Tipagem estática
- **React Navigation** 6.1.9 - Navegação entre telas

### Backend & Autenticação
- **Firebase Authentication** - Sistema de login
- **Firebase SDK** 10.7.1 - Integração com serviços

### Armazenamento
- **AsyncStorage** - Persistência local de dados
- **Context API** - Gerenciamento de estado global

### UI/UX
- **Expo Vector Icons** - Ícones modernos
- **React Native Picker** - Seletores customizados
- **Gradientes CSS** - Efeitos visuais

## 📦 Instalação

### Pré-requisitos
- Node.js 16+ 
- npm ou yarn
- Expo CLI
- Conta no Firebase

### Passo a Passo

1. **Clone o repositório**
\`\`\`
git clone https://github.com/felipecvo-fiap-mad/2tdspw-sprint-01-mototrack

cd 2tdspw-sprint-01-mototrack
\`\`\`

3. **Instale as dependências**
\`\`\`
npm install
\`\`\`


4. **Execute o projeto**
\`\`\`
npx expo start
\`\`\`

## 🎨 Design

### Paleta de Cores
- **Primária**: \`#3B82F6\` (Azul)
- **Secundária**: \`#1E3A8A\` (Azul Escuro)
- **Sucesso**: \`#10B981\` (Verde)
- **Erro**: \`#EF4444\` (Vermelho)
- **Aviso**: \`#F59E0B\` (Amarelo)

### Tipografia
- **iOS**: San Francisco (System)
- **Android**: Roboto
- **Pesos**: 400 (Regular), 600 (Semibold), 700 (Bold), 800 (Extrabold)

### Componentes
- **Cards**: Bordas arredondadas (16-24px)
- **Botões**: Altura 56px, bordas 16px
- **Inputs**: Altura 56px, bordas 16px
- **Sombras**: Elevação sutil com cores da marca

## 📊 Status das Motocicletas

| Status | Cor | Descrição |
|--------|-----|-----------|
| 🟢 Disponível | Verde | Moto pronta para uso |
| 🔵 Em Uso | Azul | Moto sendo utilizada |
| 🔴 Manutenção | Vermelho | Moto em reparo |
| 🟡 Reservada | Amarelo | Moto reservada |

## 🗺️ Layout do Pátio

O pátio é organizado em uma grade de **5 fileiras (A-E)** por **10 vagas (1-10)**:

\`\`\`
    1  2  3  4  5  6  7  8  9  10
A  [ ][ ][ ][ ][ ][ ][ ][ ][ ][ ]
B  [ ][ ][ ][ ][ ][ ][ ][ ][ ][ ]
C  [ ][ ][ ][ ][ ][ ][ ][ ][ ][ ]
D  [ ][ ][ ][ ][ ][ ][ ][ ][ ][ ]
E  [ ][ ][ ][ ][ ][ ][ ][ ][ ][ ]
\`\`\`

Total: **50 vagas** disponíveis

## 🔒 Segurança

### Autenticação
- **Firebase Auth**: Autenticação segura na nuvem
- **Validação de Email**: Verificação de formato
- **Senhas Seguras**: Mínimo 6 caracteres
- **Sessões Persistentes**: Login automático seguro

### Dados
- **Armazenamento Local**: AsyncStorage criptografado
- **Validação de Entrada**: Sanitização de dados
- **Tratamento de Erros**: Mensagens em português

## 📈 Performance

### Otimizações
- **Lazy Loading**: Carregamento sob demanda
- **Context Optimization**: Estado global eficiente
- **Image Optimization**: Ícones vetoriais
- **Memory Management**: Limpeza automática

### Métricas
- **Tempo de Inicialização**: < 2 segundos
- **Navegação**: Transições fluidas
- **Responsividade**: Suporte a múltiplas resoluções

## 🧪 Testes

### Funcionalidades Testadas
- ✅ Autenticação (Login/Registro)
- ✅ CRUD de Motocicletas
- ✅ Navegação entre telas
- ✅ Persistência de dados
- ✅ Temas claro/escuro
- ✅ Responsividade

### Dispositivos Testados
- 📱 iPhone (iOS 14+)
- 📱 Android (API 21+)
- 📱 Diferentes resoluções

## 📝 Roadmap

### Versão 2.0
- [ ] 📊 Dashboard com gráficos
- [ ] 📱 Notificações push
- [ ] 🔍 Busca avançada
- [ ] 📄 Relatórios em PDF
- [ ] 🌐 Sincronização em nuvem

### Versão 2.1
- [ ] 📷 Scanner de QR Code
- [ ] 🗓️ Agendamento de manutenção
- [ ] 👥 Múltiplos usuários
- [ ] 📈 Analytics avançado

<div align="center">

**⭐ espero que tenha gostado do projeto! ⭐**

</div>
