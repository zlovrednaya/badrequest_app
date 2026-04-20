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
            DB::rollback();
            
            return [
                'success' => false,
                'error' => 'Unable to create chore item',
                'description' => $e->getMessage()
            ];
        }
    }

    public function update(int $id, array $data)
    {

    }

    public function getAll($userId)
    {
       return Chore::where('user_id', $userId)
        ->orderBy('created_at', 'desc')
        ->get();
    }
}