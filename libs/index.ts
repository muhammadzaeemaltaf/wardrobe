import { toast } from "@/components/hooks/use-toast"

interface Products{
    id: number,
    title: string,
    price: number,
    description: string,
    category: string,
    image: string,
    rating:{
        rate: number,
        count: number
    }
}

interface CartProduct extends Pick<Products, 'id' | 'title' | 'image' | 'price'> {
  rate: Products['rating'] extends { rate: number } ? Products['rating']['rate'] : null;
  itemCount: number;
  color:  string;
  size: string;
}


async function Data(): Promise<Products[]>{

    let req = await fetch('https://fakestoreapi.com/products');
    let data = await req.json();
    return data;
}

async function Categories(cats: string): Promise<Products[]>{

    let req = await fetch(`https://fakestoreapi.com/products/category/${cats}`);
    let data = await req.json();
    return data;
}
async function SingleProduct(id: number): Promise<Products>{

    let req = await fetch(`https://fakestoreapi.com/products/${id}`);
    let data = await req.json();
    return data;
}

// Wishlist functions
function getWishlist(): number[] {
  if (typeof window !== 'undefined') {
    const wishlist = localStorage.getItem("wishlist");
    return wishlist ? JSON.parse(wishlist) : [];
  }
  return [];
}

function addToWishlist(productId: number): void {
  if (typeof window !== 'undefined') {
    const wishlist = getWishlist();
    if (!wishlist.includes(productId)) {
      wishlist.push(productId);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      window.dispatchEvent(new Event("wishlistUpdated"));
      toast({
        title: "Product added in your wishlist.",
      })
    }
  }
}

function removeFromWishlist(productId: number): void {
  if (typeof window !== 'undefined') {
    let wishlist = getWishlist();
    wishlist = wishlist.filter((id) => id !== productId);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    window.dispatchEvent(new Event("wishlistUpdated"));
    toast({
      title: "Product removed in your wishlist.",
    })
  }
}

function getRecentlyViewedProducts(): Products[] {
  if (typeof localStorage !== 'undefined') {
    const products = localStorage.getItem('recentlyViewed');
    return products ? JSON.parse(products) : [];
  }
  return [];
}

function addRecentlyViewedProduct(product: Products): void {
  if (typeof localStorage !== 'undefined') {
    let products: Products[] = getRecentlyViewedProducts();

    products = products.filter(p => p.id !== product.id);

    products.unshift(product);

    if (products.length > 3) {
      products = products.slice(0, 3);
    }
    localStorage.setItem('recentlyViewed', JSON.stringify(products));
  }
}


function getCart(): CartProduct[] {
  if (typeof window !== 'undefined') {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
  }
  return [];
}

function addToCart(product: CartProduct): void {
  if (typeof window !== 'undefined') {
    const cart = getCart();

    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      existingProduct.itemCount += product.itemCount;
    } else {
      cart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
    window.dispatchEvent(new Event("productAddedToCart"));
  }
}

function removeFromCart(productId: number): void {
  if (typeof window !== 'undefined') {
    let cart = getCart();

    cart = cart.filter((item) => item.id !== productId);

    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
  }
}


const handleItemCount = (id: number, count: number) => {
  const cartData = getCart();
  const updatedCart = cartData
    .map((product) => {
      if (product.id === id) {
        product.itemCount += count;
      }
      return product;
    })
    .filter((product) => product.itemCount > 0);
  localStorage.setItem("cart", JSON.stringify(updatedCart));
  window.dispatchEvent(new Event("cartUpdated"));
};



export { Data, Categories, SingleProduct, getWishlist, addToWishlist, removeFromWishlist, getRecentlyViewedProducts, addRecentlyViewedProduct, getCart, addToCart, removeFromCart, handleItemCount };
export type { Products, CartProduct };