<?php

namespace App\Services;

use App\Models\Category;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\ModelNotFoundException;

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
    public function getAllCategories(): LengthAwarePaginator  
    {
        return Category::with('products')
            ->orderBy('id','desc')->paginate(10);
    }

    /**
     * Get a category by ID.
     *
     * @param  int  $id
     * @return \App\Models\Category
     */
    public function getCategoryById(int $id): Category
    {
        $category = Category::with('products')->find($id);

        if (!$category) {
            throw new ModelNotFoundException("There is no category found...!");
        }

        return $category;
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
