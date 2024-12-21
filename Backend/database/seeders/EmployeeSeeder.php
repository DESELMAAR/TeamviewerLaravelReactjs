<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
class EmployeeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('employees')->insert([
            'Employee_Name' => Str::random(10),
            'User_Name' => Str::random(10).'@example.com',
            'Password' => Hash::make('password'),
            'Date' => Str::random(10),
            'Post' => Str::random(10),
            'Team' => Str::random(10),
        ]);
    }
}
