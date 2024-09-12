<?php

namespace App\Services;

use App\Models\Product;

Class ProductService {

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
            dd($product);
            $product->delete();
            return response()->json([
                'message' => 'Product deleted successfully',
            ], 200);
        } catch (\Exception $e) {
            throw new \Exception('Error deleting product: ' . $e->getMessage());
        }
    }

}