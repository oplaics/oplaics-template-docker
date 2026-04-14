<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class PermissionsSeeder extends Seeder
{
    public function run(): void
    {
        app(PermissionRegistrar::class)->forgetCachedPermissions();
        $guard = 'web';

        $permissionsByModule = [
            'permissions' => [
                'view',
                'update'
            ],
        ];

        $allPermissions = [];
        foreach ($permissionsByModule as $module => $actions) {
            foreach ($actions as $action) {
                $name = $module . '.' . $action;
                Permission::firstOrCreate(['name' => $name, 'guard_name' => $guard,]);
                $allPermissions[] = $name;
            }
        }

        $roles = [
            'owner' => $allPermissions,
            'admin' => [],
            'user' => [],
        ];
        foreach ($roles as $roleName => $permissionNames) {
            $role = Role::firstOrCreate(['name' => $roleName, 'guard_name' => $guard,]);
            $role->syncPermissions($permissionNames);
        }

        app(PermissionRegistrar::class)->forgetCachedPermissions();
    }
}
