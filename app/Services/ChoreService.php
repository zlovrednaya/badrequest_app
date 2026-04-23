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

    public function getChoresStructure($userId)
    {
        
        $resultArray = [];
        
        $chores = $this->getAll($userId); 

        if (empty($chores)) {
            return [];
        } 

        $tmpCategories = [];
        $tmpColors = [];

        foreach($chores as $chore) {
            if (!empty($chore['category']) && !in_array($chore['category'], $tmpCategories)) {
                if (empty($resultArray['category']['amount'])) {
                    $resultArray['category']['amount'] = 0;
                    $resultArray['category']['name'] = 'Category';
                    $resultArray['category']['items'] = [];
                }
                $resultArray['category']['items'][] = [
                    'name' => $chore['category'],
                ];
                $tmpCategories[] = $chore['category'];
                $resultArray['category']['amount']++;
            }
                
            if (!empty($chore['color']) && !in_array($chore['color'], $tmpColors)) {
                if (empty($resultArray['color']['amount'])) {
                    $resultArray['color']['amount'] = 0;
                    $resultArray['color']['items'] = [];
                    $resultArray['color']['name'] = 'Color';
                }
                if (empty( $resultArray['color']['items'][$chore['color']])) {
                    $resultArray['color']['items'][$chore['color']] = [
                        'amount' => 0,
                    ];

                }
                $resultArray['color']['items'][$chore['color']]['name'] = $chore['color'];
                $resultArray['color']['items'][$chore['color']]['color'] = $chore['color'];
                $resultArray['color']['items'][$chore['color']]['amount']++;
                $tmpCategories[] = $chore['color'];
                $resultArray['color']['amount']++;
            }

            if (!empty($chore['drawing'])) {
                if (empty($resultArray['drawings']['amount'])) {
                    $resultArray['drawings']['amount'] = 0;
                }
                $resultArray['drawings']['amount']++;
            }
        }

        // reformat from output
        foreach ($resultArray as &$arr) {
            if(!empty($arr['items'])) {
                $arr['items'] = array_values($arr['items']);
            }
        }

        return array_values($resultArray);
    }
}