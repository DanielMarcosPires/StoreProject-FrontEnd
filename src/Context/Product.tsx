"use client"
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { productSchema } from '@/Components/ProductsList/ProductsList';

/**
 * Define exatamente o que pode ser guardado e manipulado no contexto.
 * É como uma lista de ingredientes que nossa "caixa mágica" pode conter.
 */
interface ProductContextType {
    // SEÇÃO DOS PRODUTOS 
    products: productSchema[];                                           
    setProducts: React.Dispatch<React.SetStateAction<productSchema[]>>;     

    // SEÇÃO DO CARRINHO
    cart: any[];                                    
    addToCart: (product: productSchema) => void;    
    removeFromCart: (productId: number) => void;    
    updateProduct: (updatedProduct: productSchema) => void;
}

/**
 * createContext() cria uma caixa que pode ser compartilhada entre componentes.
 * Inicialmente está vazia (undefined), mas será preenchida pelo ProductProvider.
 */
const ProductContext = createContext<ProductContextType | undefined>(undefined);

/**
 * Este componente é responsável por:
 * - Guardar todos os dados (produtos e carrinho)
 * - Fornecer funções para manipular esses dados
 * - Compartilhar tudo com os componentes filhos
 * 
 * COMO USAR:
 * Envolva sua aplicação com este provider no layout.tsx:
 * ```tsx
 * <ProductProvider>
 *   <SuaAplicacao />
 * </ProductProvider>
 * ```
 * 
 * @param children - Todos os componentes que poderão acessar o contexto
 */
export function ProductProvider({children}: {children: ReactNode}) {
    

    const [products, setProducts] = useState<productSchema[]>([]);
    const [cart, setCart] = useState<any[]>([]);

    /**
     * Usado principalmente para diminuir estoque quando produto é adicionado ao carrinho.
     * 
     * COMO FUNCIONA:
     * 1. Recebe um produto atualizado
     * 2. Encontra o produto com o mesmo ID na lista
     * 3. Substitui o produto antigo pelo novo
     * 4. Mantém todos os outros produtos inalterados
     * 
     * EXEMPLO DE USO:
     * ```tsx
     * const { updateProduct } = useProduct();
     * 
     * // Diminuir estoque em 1
     * updateProduct({
     *   ...produtoOriginal,
     *   quantity: produtoOriginal.quantity - 1
     * });
     * ```
     * 
     * @param updatedProduct - Produto com as informações atualizadas
     */
    const updateProduct = (updatedProduct: productSchema) => {

     
        setProducts((prevProducts) => 
              
            prevProducts.map(product =>
                product.id === updatedProduct.id ? updatedProduct : product
            )
        )
    }

    /**
     * LÓGICA INTELIGENTE:
     * - Se produto JÁ existe no carrinho → Aumenta quantidade +1
     * - Se produto NÃO existe no carrinho → Adiciona como novo item
     * 
     * PASSO A PASSO:
     * 1. Procura se produto já está no carrinho
     * 2a. Se ENCONTROU: Aumenta cartQuantity +1
     * 2b. Se NÃO ENCONTROU: Cria novo item com cartQuantity = 1
     * 
     * EXEMPLO DE USO:
     * ```tsx
     * const { addToCart } = useProduct();
     * 
     * // Adicionar pizza ao carrinho
     * addToCart({
     *   id: 1,
     *   name: "Pizza Margherita",
     *   price: 15,
     *   quantity: 10,
     *   category: "Pizza",
     *   image: "pizza.jpg"
     * });
     * ```
     * 
     * @param product - Produto a ser adicionado ao carrinho
     */
    const addToCart = (product: productSchema) => {
    // Verificar se há estoque disponível
    if (product.quantity <= 0) {
        console.warn("Produto sem estoque!");
        return;
    }

    setCart((prevCart) => {
        // Procurar SE produto já existe no carrinho
        const existingItem = prevCart.find(item => item.id === product.id);
        
        if (existingItem) {
            // SE produto ja existe: Aumentar quantidade
            return prevCart.map(item =>
                item.id === product.id 
                    ? { ...item, cartQuantity: item.cartQuantity + 1 }
                    : item
            );
        } else {
            // CASO CONTRÁRIO: Produto novo, adicionar ao carrinho
            return [...prevCart, {
                id: product.id,
                name: product.name,
                price: product.price,
                category: product.category,
                image: product.image,
                cartQuantity: 1  
            }];
        }
    });

    // Diminuir estoque em 1 unidade
    updateProduct({
        ...product,
        quantity: product.quantity - 1
    });
};

    /**
     * Remove o produto inteiro, independente da quantidade.
     * Se quiser diminuir quantidade, use addToCart com lógica inversa.
     * 
     * COMO FUNCIONA:
     * 1. Filtra o carrinho removendo item com ID específico
     * 2. Mantém todos os outros produtos
     * 
     * EXEMPLO DE USO:
     * ```tsx
     * const { removeFromCart } = useProduct();
     * 
     * // Remover produto com ID 1
     * removeFromCart(1);
     * ```
     * 
     * @param productId - ID do produto a ser removido
     */
   
const removeFromCart = (productId: number) => {
    setCart((prevCart) => { 
        console.log("Inicio")
        const itemToRemove = prevCart.find(item => item.id === productId);
        console.log("Teste")
        if(itemToRemove){
            // Restaurar a quantidade ao estoque

            
            setProducts((prevProducts) => {
                const teste = prevProducts.map(product => 
                        product.id === productId
                            ? console.log(`quantity: ${product.quantity} + ${itemToRemove.cartQuantity} `): product
                    )
                return prevProducts.map(product => 
                    product.id === productId
                        ? { 
                            ...product, 
                            quantity: product.quantity + itemToRemove.cartQuantity 
                          }
                        : product
                )
            });
        }
        
        // Remover o item do carrinho
        console.log("Fim")
        return prevCart.filter(item => item.id !== productId);
    });
}
    /**
     * O Provider.value contém TUDO que os componentes filhos podem acessar.
     * É como abrir a caixa e deixar todo mundo ver o que tem dentro.
     */
    return (
        <ProductContext.Provider 
            value={{
                // Estados (dados)
                products,      // Lista atual de produtos
                setProducts,   // Função para trocar lista inteira
                cart,          // Carrinho atual
                
                // Funções (ações)
                updateProduct,    // Atualizar produto específico
                addToCart,        // Adicionar ao carrinho
                removeFromCart    // Remover do carrinho
            }}
        >
            {children}
        </ProductContext.Provider>
    )
}

/**
 * Este hook é a maneira FÁCIL de acessar tudo do contexto.
 * É como ter uma chave mágica que abre a caixa instantaneamente.
 * 
 * PROTEÇÃO INTELIGENTE:
 * - Verifica se você está usando dentro de um ProductProvider
 * - Se não estiver, mostra erro explicativo
 * 
 * COMO USAR EM QUALQUER COMPONENTE:
 * ```tsx
 * import { useProduct } from '@/Context/Product';
 * 
 * function MeuComponente() {
 *   // 🔑 Abrir a caixa e pegar o que preciso
 *   const { products, cart, addToCart, removeFromCart } = useProduct();
 *   
 *   return (
 *     <div>
 *       <p>Produtos na loja: {products.length}</p>
 *       <p>Itens no carrinho: {cart.length}</p>
 *       <button onClick={() => addToCart(algumProduto)}>
 *         Adicionar ao carrinho
 *       </button>
 *     </div>
 *   );
 * }
 * ```
 * 
 * @returns Todos os dados e funções do ProductContext
 * @throws Error se usado fora do ProductProvider
 */
export function useProduct() {
    // Tentar acessar o contexto
    const context = useContext(ProductContext);
    
    // 🚨 Verificação de segurança
    if (!context) {
        throw new Error(
            "🚨 ERRO: useProduct deve ser usado dentro de um ProductProvider!\n" +
            "💡 SOLUÇÃO: Envolva seu componente com <ProductProvider>...</ProductProvider>"
        );
    }
    
    // Tudo certo! Retornar o conteúdo da caixa
    return context;
}
