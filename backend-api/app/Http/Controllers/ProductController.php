<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Log;
use App\Http\Requests\StoreProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use App\Services\ProductService;
use Dotenv\Exception\ValidationException;
use Illuminate\Http\JsonResponse;

class ProductController extends Controller
{   

    protected ProductService $productService;

    /**
     * Class constructor.
     */
    public function __construct(ProductService $productService)
    {
        $this->productService = $productService;
    }

    public function index() {
        try {
            $products = $this->productService->getAllProducts();
            return ProductResource::collection($products);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Error fetching products: ' . $e->getMessage(),
            ], 500);
        }
    }

    public function show($productID) {
        try {
            $product = $this->productService->getProductById($productID);
            return new ProductResource($product);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function store(StoreProductRequest $request): JsonResponse {
        try {
            $product = $this->productService->createProduct($request->validated());
            return response()->json([
                'message' => 'Product created successfully',
                'data' => $product,
            ], 201);
        } catch (ValidationException $e) {
            return response()->json([
                'error' => 'Validation failed: ' . $e->getMessage(),
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Error creating product: ' . $e->getMessage(),
            ], 500);
        }
    }

    public function update(StoreProductRequest $request, Product $product): JsonResponse
    {
        try {
            $updatedProduct = $this->productService->updateProduct($product, $request->validated());
            return response()->json([
                'message' => 'Product updated successfully',
                'data' => $updatedProduct,
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function destroy(Product $product): JsonResponse
    {
        try {
            $this->productService->deleteProduct($product);
            return response()->json(['message' => 'Product deleted successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}


