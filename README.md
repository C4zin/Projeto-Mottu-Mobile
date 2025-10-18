# 🏍️ Moto Manager (MotoTrack)

<div align="center">

![React Native](https://img.shields.io/badge/React%20Native-0.81.4-blue?style=for-the-badge&logo=react)
![Expo](https://img.shields.io/badge/Expo-54.0.11-black?style=for-the-badge&logo=expo)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-blue?style=for-the-badge&logo=typescript)
![Firebase](https://img.shields.io/badge/Firebase-12.2.0-orange?style=for-the-badge&logo=firebase)

**Um aplicativo mobile moderno para gerenciamento de motos em pátios**

[Características](#-características) • [Instalação](#-instalação) • [Tecnologias](#-tecnologias) • [Estrutura](#-estrutura-do-projeto) • [Autores](#-autores)

</div>

---

## 📱 Sobre o Projeto

O **Moto Manager** é uma solução completa para empresa mottu que precisa gerenciar frotas de motocicletas. Com uma interface moderna e intuitiva, o aplicativo permite controlar o status, localização e informações detalhadas de cada veículo em tempo real.

> **Observação:** Use o aplicativo em modo escuro para melhor experiência visual.

---

## ✨ Características

### 🔐 Sistema de Autenticação
- **Login Seguro** com Firebase Authentication
- **Registro de Usuários** com validação de email e senha
- **Persistência de Sessão** - Login automático
- **Logout Seguro** - Encerramento protegido da sessão
- **Mensagens de Erro** em português para melhor UX

### 🏠 Dashboard Principal
- **Estatísticas em Tempo Real**
  - Total de motocicletas cadastradas
  - Motos disponíveis
  - Motos em manutenção
- **Últimas Atividades** - Histórico de acessos com timestamp
- **Navegação Rápida** - Acesso direto às principais funcionalidades
- **Cards Informativos** - Visualização clara e organizada dos dados
- **Pull-to-Refresh** - Atualização manual dos dados
- **Integração IoT** - Link direto para sistema externo de monitoramento

### 🏍️ Gerenciamento de Motocicletas

#### Cadastro Completo
- **Informações Básicas**
  - Modelo (seleção de modelos pré-cadastrados)
  - Filial (seleção de filiais pré-cadastradas)
  - Placa (validação de formato)
  - Ano de fabricação
  - Cor do veículo
  - Quilometragem atual
- **Status Dinâmico**
  - 🟢 Disponível - Moto pronta para uso
  - 🔵 Em Uso - Moto sendo utilizada
  - 🔴 Manutenção - Moto em reparo
  - 🟡 Reservada - Moto reservada para uso futuro

#### Controle de Status
- **Alteração Rápida** - Mudança de status com um toque
- **Histórico Automático** - Registro de todas as alterações
- **Notificações** - Alertas automáticos em mudanças de status
- **Validações** - Prevenção de conflitos e dados inválidos

#### Visualização e Busca
- **Lista Completa** - Todas as motos cadastradas
- **Filtros por Status** - Visualização rápida por categoria
- **Detalhes Completos** - Informações técnicas e operacionais
- **Navegação Intuitiva** - Acesso rápido aos detalhes

### 📋 Detalhes da Motocicleta

#### Informações Completas
- **Dados Técnicos** - Modelo, placa, ano, cor
- **Dados Operacionais** - Status atual, quilometragem
- **Localização** - Filial e posição exata no pátio
- **Histórico** - Data de cadastro e última atualização
- **Observações** - Notas e comentários importantes

#### Ações Disponíveis
- **Alteração de Status** - Mudança rápida entre estados
- **Edição** - Modificação de informações cadastrais
- **Exclusão** - Remoção com confirmação de segurança
- **Compartilhamento** - Exportação de informações

### 🔔 Sistema de Notificações

#### Notificações Inteligentes
- **Nova Motocicleta** - Alerta ao cadastrar nova moto
- **Mudança de Status** - Notificação em alterações de status
- **Manutenção Preventiva** - Alerta quando faltam ≤500km para manutenção
  - Baseado em intervalos de 5.000km
  - Cálculo automático pela quilometragem
- **Resumo Diário** - Estatísticas enviadas às 9h da manhã
- **Navegação Direta** - Toque na notificação abre detalhes da moto

#### Controles
- **Ativar/Desativar** - Controle total sobre notificações
- **Permissões** - Solicitação adequada de permissões do sistema
- **Canais Android** - Configuração otimizada para Android
- **Sons e Vibrações** - Feedback tátil e sonoro

### 🌍 Multi-idioma
- **Português (PT-BR)** - Idioma padrão
- **Espanhol (ES)** - Suporte completo
- **Persistência** - Preferência salva automaticamente
- **Troca Instantânea** - Mudança sem reiniciar o app

### 🎨 Temas Personalizáveis
- **Modo Claro** - Interface clara e profissional
- **Modo Escuro** - Redução de fadiga visual (recomendado)
- **Persistência** - Tema salvo automaticamente
- **Transições Suaves** - Mudança fluida entre temas

### ⚙️ Configurações

#### Personalização
- **Tema** - Alternância entre claro e escuro
- **Idioma** - Seleção entre português e espanhol
- **Notificações** - Controle de alertas e lembretes

#### Informações do Sistema
- **Versão do App** - Controle de versioning (v1.0.0)
- **Estatísticas** - Dados de uso e performance
- **Último Acesso** - Histórico de utilização

#### Gerenciamento de Dados
- **Armazenamento Local** - Dados salvos no dispositivo
- **Limpeza de Dados** - Remoção com confirmação
- **Backup Automático** - Persistência em AsyncStorage
- **Logout Seguro** - Encerramento com limpeza de sessão

### 🔗 Integração IoT
- **Sistema Externo** - Link para dashboard Streamlit
- **Monitoramento em Tempo Real** - Dados de sensores e dispositivos
- **Abertura Automática** - Deep linking para navegador

---

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React Native** 0.81.4 - Framework principal
- **Expo** 54.0.11 - Plataforma de desenvolvimento
- **Expo Router** - Sistema de navegação baseado em arquivos
- **TypeScript** 5.7.2 - Tipagem estática e segurança

### Backend & Autenticação
- **Firebase Authentication** - Sistema de login seguro
- **Firebase SDK** 12.2.0 - Integração com serviços Google

### Armazenamento & Estado
- **AsyncStorage** - Persistência local de dados
- **Context API** - Gerenciamento de estado global
  - AuthContext - Autenticação
  - MotorcycleContext - Dados das motos
  - ThemeContext - Tema do app
  - LanguageContext - Idioma
  - NotificationContext - Notificações

### Notificações
- **Expo Notifications** - Sistema de push notifications
- **Notificações Locais** - Alertas sem servidor
- **Notificações Agendadas** - Lembretes programados

### UI/UX
- **Expo Vector Icons** - Biblioteca de ícones (Ionicons)
- **React Native Picker** - Seletores customizados
- **Gradientes** - Efeitos visuais modernos
- **Animações** - Transições suaves

---

## 📦 Instalação

### Pré-requisitos
- **Node.js** 16+ 
- **npm** ou **yarn**
- **Expo CLI** (`npm install -g expo-cli`)
- **Expo Go** (app mobile para testes)

### Passo a Passo

1. **Clone o repositório**

git clone https://github.com/felipecvo-fiap-mad/2tdspw-sprint-01-mototrack

cd 2tdspw-sprint-01-mototrack


2. **Instale as dependências**

npm install
# ou
yarn install


3. **Execute o projeto**

npx expo start


5. **Teste no dispositivo**
   - Escaneie o QR Code com o app **Expo Go** (Android/iOS)
   - Ou pressione `a` para Android Emulator
   - Ou pressione `i` para iOS Simulator

---

## 📁 Estrutura do Projeto

<img width="255" height="668" alt="image" src="https://github.com/user-attachments/assets/e9263991-4ab2-455c-abae-6972cb4bc141" />


---

## 🎨 Design

### Paleta de Cores de Acordo com a Mottu

#### Tema Claro
- **Primária**: `#10B981` (Verde Esmeralda)
- **Secundária**: `#065F46` (Verde Escuro)
- **Fundo**: `#F1F5F9` (Cinza Claro)
- **Cards**: `#FFFFFF` (Branco)
- **Texto**: `#065F46` (Verde Escuro)

#### Tema Escuro
- **Primária**: `#10B981` (Verde Esmeralda)
- **Secundária**: `#065F46` (Verde Escuro)
- **Fundo**: `#0F172A` (Azul Escuro)
- **Cards**: `#1E293B` (Cinza Escuro)
- **Texto**: `#FFFFFF` (Branco)

#### Status
- **Disponível**: `#10B981` (Verde)
- **Em Uso**: `#059669` (Verde Escuro)
- **Manutenção**: `#DC2626` (Vermelho)
- **Reservada**: `#F59E0B` (Amarelo)

### Tipografia
- **iOS**: San Francisco (System)
- **Android**: Roboto
- **Pesos**: 400 (Regular), 600 (Semibold), 700 (Bold), 800 (Extrabold)

---

## 🔒 Segurança

### Autenticação
- **Firebase Auth** - Autenticação segura na nuvem
- **Validação de Email** - Verificação de formato
- **Senhas Seguras** - Mínimo 6 caracteres (Firebase)
- **Sessões Persistentes** - Login automático seguro
- **Logout Protegido** - Limpeza completa de dados

### Dados
- **Armazenamento Local** - AsyncStorage criptografado
- **Validação de Entrada** - Sanitização de dados
- **Tratamento de Erros** - Mensagens em português
- **Sem Dados Sensíveis** - Nenhuma informação crítica armazenada

### Permissões
- **Notificações** - Solicitação adequada de permissões
- **Mínimo Necessário** - Apenas permissões essenciais

---

## 📈 Performance

### Otimizações
- **Lazy Loading** - Carregamento sob demanda
- **Context Optimization** - Estado global eficiente
- **Image Optimization** - Ícones vetoriais
- **Memory Management** - Limpeza automática de recursos
- **AsyncStorage** - Persistência rápida e eficiente

### Métricas
- **Tempo de Inicialização**: < 2 segundos
- **Navegação**: Transições fluidas (60 FPS)
- **Responsividade**: Suporte a múltiplas resoluções

---

## 🧪 Funcionalidades Testadas

### Autenticação
- ✅ Login com email/senha
- ✅ Registro de novos usuários
- ✅ Persistência de sessão
- ✅ Logout seguro
- ✅ Tratamento de erros

### CRUD de Motocicletas
- ✅ Cadastro completo
- ✅ Listagem com busca e filtros
- ✅ Visualização de detalhes
- ✅ Edição de informações
- ✅ Exclusão com confirmação
- ✅ Alteração de status

### Notificações
- ✅ Nova motocicleta
- ✅ Mudança de status
- ✅ Manutenção preventiva
- ✅ Resumo diário
- ✅ Navegação por tap

### Interface
- ✅ Tema claro/escuro
- ✅ Multi-idioma (PT/ES)
- ✅ Navegação entre telas
- ✅ Pull-to-refresh
- ✅ Responsividade

### Dispositivos Testados
- 📱 iPhone (iOS 14+)
- 📱 Android (API 21+)
- 📱 Diferentes resoluções e tamanhos

---

## 👨‍💻 Autores

<table>
  <tr>
    <td align="center">
      <strong>Cauã Sanches de Santana</strong><br>
      RM558317<br>
      <a href="https://github.com/C4zin">@C4zin</a>
    </td>
    <td align="center">
      <strong>Angello Turano da Costa</strong><br>
      RM556511<br>
      <a href="https://github.com/AngelloTDC">@AngelloTDC</a>
    </td>
    <td align="center">
      <strong>Leonardo Bianchi</strong><br>
      RM558576<br>
      <a href="https://github.com/leonardobianchii">@leonardobianchii</a>
    </td>
  </tr>
</table>

---

## 📄 Licença

Este projeto foi desenvolvido como parte do curso de **Análise e Desenvolvimento de Sistemas** da **FIAP**.

---

## 🙏 Agradecimentos

- **FIAP** - Pela oportunidade de aprendizado

---
