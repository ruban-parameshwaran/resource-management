<?php

namespace App\Services;

use App\Models\Product;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

Class ProductService {

    public function getAllProducts(): LengthAwarePaginator {
        return Product::with('category')
            ->orderBy('id','desc')->paginate(10);
    }

    /**
     * Create a new Product
     */
    public function createProduct(array $data): Product
    {
        return Product::create($data);
    }

    public function updateProduct(Product $product, array $data)
    {
        return $product->update($data);
    }
    
    public function deleteProduct(Product $product)
    {
        return $product->delete();
    }

    public function getProductById($productID)
    {
        $product = Product::with('category')->find($productID);

        if (!$product) {
            throw new ModelNotFoundException("There is no product found...!");
        }

        return $product;
    }

}