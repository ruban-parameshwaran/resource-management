<?php

namespace App\Http\Controllers;

use App\Http\Requests\CustomerRequest;
use App\Http\Resources\CustomerResource;
use App\Models\Customer;
use App\Services\CustomerService;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Mockery\Matcher\Any;

class CustomerController extends Controller
{

    protected $customerService;

    /**
     * Class constructor.
     */
    public function __construct(CustomerService $customerService)
    {
        $this->customerService = $customerService;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(): JsonResponse
    {
        try {
            $customers = $this->customerService->getAllCustomers();
            return CustomerResource::collection($customers)->response();
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Error fetching customers: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function store(CustomerRequest $request): JsonResponse
    {
        try {
            $customer = $this->customerService->createCustomer($request->validated());
            return response()->json([
                'message' => 'Product created successfully',
                'data' => $customer,
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Error creating customer: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(int $id): CustomerResource
    {
        try {
            $customer = $this->customerService->getCustomerById($id);
            return new CustomerResource($customer);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'error' => 'Customer not found: ' . $e->getMessage(),
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Error fetching customer: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(CustomerRequest $request, Customer $customer): JsonResponse
    {
        try {
            $updatedCustomer = $this->customerService->updateCustomer($customer, $request->validated());
            return response()->json([
                'message' => 'Customer updated successfully',
                'data' => $updatedCustomer,
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
    public function destroy(Customer $customer): JsonResponse
    {
        try {
            $this->customerService->deleteCustomer($customer);
            return response()->json(['message' => 'Customer deleted successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
