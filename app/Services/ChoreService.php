<?php
namespace App\Services;

use Illuminate\Support\Facades\DB;
use App\Models\Chore;

class ChoreService 
{
    public function add(array $data)
    {
        $data['user_id'] = auth()->id();

        DB::beginTransaction();
        try {
            $chore = Chore::create($data);
            DB::commit();

            return $chore;
        } catch(\Exception $e) {
            echo print_r($e->getMessage());
            DB::rollback();
            
            return [
                'success' => false,
                'error' => 'Unable to create chore item',
            ];
        }
    }

    public function update(int $id, array $data)
    {

    }
}