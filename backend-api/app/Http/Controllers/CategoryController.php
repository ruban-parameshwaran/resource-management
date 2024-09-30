<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Services\CategoryService;
use App\Http\Requests\CategoryRequest;
use App\Http\Resources\CategoryResource;

use Illuminate\Http\JsonResponse;
use Dotenv\Exception\ValidationException;
use Illuminate\Http\Request;

class CategoryController extends Controller
{       
    protected $categoryService;

    /**
     * Class constructor.
     */
    public function __construct(CategoryService $categoryService)
    {
        $this->categoryService = $categoryService;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $categories = $this->categoryService->getAllCategories();
            return CategoryResource::collection($categories)->response();
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Error fetching categories: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     * @param  CategoryRequest $request
     * @return JsonResponse
     */
    public function store(CategoryRequest $request): JsonResponse
    {   
        try {
 
            $category = $this->categoryService->createCategory($request->validated());
            return response()->json([
                "message"   => 'Category created successfully',
                "success"   => true,
                "data"      => new CategoryResource($category)
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Error creating category: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try {
            $category = $this->categoryService->getCategoryById($id);
            return new CategoryResource($category);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(CategoryRequest $request, Category $category): JsonResponse
    {
        try {
            $this->categoryService->updateCategory($category, $request->validated());
            return response()->json([
                'message' => 'Category updated successfully',
                'success' => true,
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Category $category): JsonResponse
    {
        try {
            $this->categoryService->deleteCategory($category);
            return response()->json([
                'message' => 'Category deleted successfully',
                'success' => true
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
