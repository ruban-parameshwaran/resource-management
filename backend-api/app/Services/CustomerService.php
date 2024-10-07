<?php

namespace App\Services;

use App\Models\Customer;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class CustomerService
{
    /**
     * Create a new customer.
     *
     * @param  array  $data
     * @return \App\Models\Customer
     */
    public function createCustomer(array $data): Customer
    {
        return Customer::create($data);
    }

    /**
     * Get all customers.
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getAllCustomers(): LengthAwarePaginator
    {
        return Customer::with('orders')
            ->orderBy('id','desc')
            ->paginate(10);
    }

    /**
     * Get a customer by ID.
     *
     * @param  int  $id
     * @return \App\Models\Customer
     */
    public function getCustomerById(int $id): Customer
    {

        $customer = Customer::with('orders')->find($id);

        if (!$customer) {
            throw new ModelNotFoundException("There is no customer found...!");
        }

        return $customer;
    }
    
    public function deleteCustomer(Customer $customer)
    {
        return $customer->delete();
    }

    public function updateCustomer(customer $customer, array $data)
    {
        return $customer->update($data);
    }
}
