<?php

namespace App\Services;

use App\Models\Category;

class CategoryService
{
    /**
     * Create a new category.
     *
     * @param  array  $data
     * @return \App\Models\Category
     */
    public function createCategory(array $data): Category
    {
        return Category::create($data);
    }

    /**
     * Get all categories.
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getAllCategories()
    {
        return Category::with('products')->get();
    }

    /**
     * Get a category by ID.
     *
     * @param  int  $id
     * @return \App\Models\Category
     */
    public function getCategoryById(int $id): Category
    {
        return Category::with('products')->findOrFail($id);
    }

    public function updateCategory(Category $category, array $data)
    {
        return $category->update($data);
    }

    public function deleteCategory(Category $category)
    {
        return $category->delete();
    }
}
