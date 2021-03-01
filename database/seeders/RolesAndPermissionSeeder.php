<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;


class RolesAndPermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Buyer Permissions
        Permission::create(['name' => 'view designs']);
        Permission::create(['name' => 'buy designs']);
        Permission::create(['name' => 'choose manufacturer']);
        // Designer Permissions
        Permission::create(['name' => 'upload design']);
        Permission::create(['name' => 'choose bid']);
        Permission::create(['name' => 'delete design']);
        Permission::create(['name' => 'update design']);
        // Manufacturer Permissions

        // Roles
        $role = Role::create(['name' => 'buyer'])
            ->givePermissionTo(['view designs', 'buy designs', 'choose manufacturer']);
        
        $role = Role::create(['name' => 'designer'])
            ->givePermissionTo(['upload design', 'choose bid', 'delete design', 'update design']);

        $role = Role::create(['name' => 'manufacturer'])
            ->givePermissionTo(['view designs']);

    }
}
