<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $admin                          = new User();
        $admin->email                   = "admin@admin.com";
        $admin->password                = Hash::make('admin1234');
        $admin->user_type               = "Admin";
        $admin->first_name              = "john";
        $admin->last_name               = "doe";
        $admin->save();
    }
}
