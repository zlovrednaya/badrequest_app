<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\DB;

class UserService
{
    protected function user(): User
    {
        $this->user = auth()->user();
        return $this->user;
    }

    public function update(array $data)
    {
        DB::beginTransaction();
        try {
            $user = User::where(['id'=>$this->user()->id])
            ->update($data);
            
            DB::commit();
            return $user;

        } catch(\Exception $e) {
            DB::rollback();
            
            return [
                'success' => false,
                'error' => 'Unable to update user',
                'description' => $e->getMessage()
            ];
        }
    }
}