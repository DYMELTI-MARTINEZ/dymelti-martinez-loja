# 🛍️ DYMELTI MARTINEZ - Loja Virtual

Uma loja virtual moderna e responsiva desenvolvida em HTML, CSS e JavaScript puro para a marca **DYMELTI MARTINEZ**.

## ✨ Características

- **Design moderno** com cores roxo, azul e preto
- **Letreiro animado** com o nome da loja
- **Catálogo de produtos** completo com variações
- **Carrinho de compras** funcional
- **Integração com WhatsApp** para finalizar pedidos
- **Totalmente responsivo** para mobile e desktop
- **Performance otimizada** com lazy loading
- **Sem dependências** - apenas HTML, CSS e JS puro

## 🏗️ Estrutura do Projeto

```
dymelti-martinez-loja/
│
├── index.html                 # Página principal
├── README.md                  # Documentação
│
├── /styles/
│   └── style.css             # Estilos principais
│
├── /scripts/
│   ├── products.js           # Dados e renderização dos produtos
│   ├── cart.js              # Sistema de carrinho
│   └── main.js              # Funcionalidades principais
│
├── /public/
│   ├── logo.png             # Logo da loja (adicionar sua imagem)
│   └── banner.jpg           # Banner principal (adicionar sua imagem)
│
└── /components/             # Componentes reutilizáveis (futuro)
```

## 🚀 Como usar

### 1. **Preparar o projeto**
```bash
# Criar pasta do projeto
mkdir dymelti-martinez-loja
cd dymelti-martinez-loja

# Criar estrutura de pastas
mkdir styles scripts public components
```

### 2. **Adicionar os arquivos**
- Copie todos os códigos fornecidos para seus respectivos arquivos
- Adicione suas imagens na pasta `/public/`:
  - `logo.png` - Logo da loja
  - `banner.jpg` - Banner principal

### 3. **Personalizar produtos**
Edite o arquivo `scripts/products.js` para adicionar seus produtos:

```javascript
const products = [
    {
        id: 1,
        name: "Seu Produto",
        description: "Descrição do produto",
        price: 99.90,
        images: ["caminho/para/imagem1.jpg", "caminho/para/imagem2.jpg"],
        sizes: ["P", "M", "G"],
        colors: [
            { name: "Cor", value: "#codigo-cor" }
        ],
        available: true,
        category: "categoria"
    }
    // Adicione mais produtos aqui
];
```

### 4. **Subir para o GitHub**
```bash
# Inicializar Git
git init
git add .
git commit -m "Loja virtual DYMELTI MARTINEZ"

# Conectar ao GitHub
git remote add origin https://github.com/SEU-USUARIO/dymelti-martinez-loja.git
git branch -M main
git push -u origin main
```

### 5. **Deploy na Vercel**
1. Acesse [vercel.com](https://vercel.com)
2. Conecte sua conta do GitHub
3. Selecione o repositório
4. Clique em "Deploy"

## 🎨 Personalização

### **Cores**
As cores principais estão definidas no arquivo `styles/style.css`:

```css
:root {
    --primary-purple: #6b46c1;    /* Roxo principal */
    --secondary-blue: #3b82f6;     /* Azul secundário */
    --accent-black: #1f2937;       /* Preto de destaque */
    /* Personalize estas cores conforme necessário */
}
```

### **Contato**
No arquivo `scripts/cart.js`, atualize as informações de contato:

```javascript
// Número do WhatsApp
const whatsappNumber = '5562998806950';

// Instagram
const instagramHandle = '@dymelti_martinez';
```

### **Letreiro**
Para personalizar o texto do letreiro, edite no `index.html`:

```html
<div class="ticker">
    <span>SEU TEXTO AQUI SEU TEXTO AQUI SEU TEXTO AQUI </span>
</div>
```

## 📱 Funcionalidades

### **Carrinho de Compras**
- ✅ Adicionar produtos com variações de cor e tamanho
- ✅ Visualizar itens no carrinho
- ✅ Calcular total automaticamente
- ✅ Remover itens individualmente
- ✅ Finalizar pedido via WhatsApp

### **Catálogo de Produtos**
- ✅ Galeria de imagens para cada produto
- ✅ Variações de cor e tamanho
- ✅ Produtos indisponíveis
- ✅ Descrições detalhadas
- ✅ Preços formatados em Real

### **Interface**
- ✅ Design responsivo
- ✅ Letreiro animado
- ✅ Navegação suave
- ✅ Modals para produtos
- ✅ Notificações de ações
- ✅ Botão voltar ao topo

### **Integrações**
- ✅ WhatsApp para pedidos
- ✅ Instagram da loja
- ✅ Links de contato direto

## 🔧 Manutenção

### **Adicionar novos produtos**
1. Abra `scripts/products.js`
2. Adicione um novo objeto ao array `products`
3. Inclua as imagens na pasta apropriada
4. Faça commit das mudanças

### **Atualizar informações de contato**
1. Edite `scripts/cart.js` para WhatsApp
2. Edite `index.html` para redes sociais
3. Atualize links no footer

### **Modificar cores/design**
1. Edite as variáveis CSS em `styles/style.css`
2. Personalize classes conforme necessário
3. Teste em diferentes dispositivos

## 📊 Performance

O projeto foi otimizado para:
- ⚡ **Carregamento rápido** com lazy loading
- 📱 **Mobile-first** design responsivo
- 🔍 **SEO-friendly** com meta tags apropriadas
- 💾 **Cache inteligente** para melhor experiência
- 🖼️ **Imagens otimizadas** com placeholders

## 🛠️ Tecnologias

- **HTML5** - Estrutura semântica
- **CSS3** - Estilos modernos com Flexbox/Grid
- **JavaScript ES6+** - Funcionalidades interativas
- **Font Awesome** - Ícones
- **Intersection Observer API** - Lazy loading
- **Web Storage API** - Persistência local

## 📞 Suporte

Para dúvidas sobre implementação ou personalização:

- 📱 WhatsApp: +55 62 99880-6950
- 📸 Instagram: [@dymelti_martinez](https://instagram.com/dymelti_martinez)

## 📄 Licença

Este projeto foi desenvolvido para uso exclusivo da **DYMELTI MARTINEZ**. 

---

**Desenvolvido com ❤️ para DYMELTI MARTINEZ**

*Loja virtual moderna, responsiva e otimizada para conversões.*