<?php

namespace App\Services;

use App\Models\Product;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\ModelNotFoundException;

Class ProductService {

    public function getAllProducts(): Collection {
        return Product::with('category')->get();
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
        try {
            $product->delete();
            return response()->json([
                'message' => 'Product deleted successfully',
            ], 200);
        } catch (\Exception $e) {
            throw new \Exception('Error deleting product: ' . $e->getMessage());
        }
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