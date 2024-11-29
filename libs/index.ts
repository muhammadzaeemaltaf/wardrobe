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
  if (typeof localStorage !== 'undefined') {
    const wishlist = localStorage.getItem("wishlist");
    return wishlist ? JSON.parse(wishlist) : [];
  }
  return [];
}

function addToWishlist(productId: number): void {
  if (typeof localStorage !== 'undefined') {
    const wishlist = getWishlist();
    if (!wishlist.includes(productId)) {
      wishlist.push(productId);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      window.dispatchEvent(new Event("wishlistUpdated"));
    }
  }
}

function removeFromWishlist(productId: number): void {
  if (typeof localStorage !== 'undefined') {
    let wishlist = getWishlist();
    wishlist = wishlist.filter((id) => id !== productId);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    window.dispatchEvent(new Event("wishlistUpdated"));
  }
}


export { Data, Categories, SingleProduct, getWishlist, addToWishlist, removeFromWishlist };
export type { Products };