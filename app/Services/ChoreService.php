<?php
namespace App\Services;

use Illuminate\Support\Facades\DB;
use App\Models\Chore;

class ChoreService 
{
    // [ human name=>DB_name]
    private const CATEGORY_MAP = [
        'color' => 'Color',
        'drawing' => 'Drawings',
        'category' => 'Category',
        'all' => 'All chores'
    ];

    private const COLOR_MAP = [
        'White' => '#ffffff',
        'Rose' => '#ff99c8',
        'Yellow' => '#fcf6bd',
        'Pastel green' => '#d0f4de',
        'Blue' => '#a9def9',
        'Violet' => '#e4c1f9',
    ];

    private $user;

    public function __construct() {
        $this->user = auth()->user();
        $this->userId = $this->user->id;
    }

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

    public function getByIds($ids)
    {
        return Chore::where('user_id', (int)$this->userId)
            ->whereIn('id', $ids)
            ->orderBy('created_at', 'desc')
            ->get();
    }
    public function getAll($filterData = [])
    {
       $query = Chore::where('user_id', (int)$this->userId)
            ->orderBy('created_at', 'desc');

        if(!empty($filterData['column'])) {
            $column = array_search($filterData['column'], self::CATEGORY_MAP, true);
            if ($column != 'all') {
                if ($filterData['filterWord'] === 'all') {
                    $query->whereNotNull($column);
                } else {
                    $query->where($column, $filterData['filterWord']);
                }
            }
        }
         
        return $query->get();    
    }

    // need to refactor
    public function getChoresStructure()
    {
        
        $resultArray = [];
        $chores = $this->getAll(); 

        if (empty($chores)) {
            return [];
        } 

        $tmpCategories = [];
        $tmpColors = [];

        foreach($chores as $chore) {
            if (empty($resultArray['allchores'])) {
                $resultArray['allchores'] = [
                    'name' => 'All chores',
                    'filterName' => 'all',
                    'amount' => 0,
                ];
            } else {
                $resultArray['allchores']['amount']++;
            }
            
            
            if (!empty($chore['category'])) {
                if (!in_array($chore['category'], $tmpCategories)) {
                    if (empty($resultArray['category']['amount'])) {
                    $resultArray['category']['amount'] = 0;
                    $resultArray['category']['name'] = 'Category';
                    $resultArray['category']['filterName'] = 'category';
                    $resultArray['category']['items'] = [];
                    }

                    $resultArray['category']['items'][$chore['category']] = [
                        'name' => $chore['category'],
                        'filterName' => $chore['category'],
                        'amount' => 0,
                    ];

                    $resultArray['category']['amount']++;
                    $resultArray['category']['items'][$chore['category']]['amount']++;
            
                    $tmpCategories[] = $chore['category'];
                } else {
                    $resultArray['category']['amount']++;
                    $resultArray['category']['items'][$chore['category']]['amount']++;
                }
                
            }
                
            if (!empty($chore['color'])) {
                if (!in_array($chore['color'], $tmpColors)) {
                    if (empty($resultArray['color']['amount'])) {
                    $resultArray['color']['amount'] = 0;
                    $resultArray['color']['items'] = [];
                    $resultArray['color']['name'] = 'Color';
                    $resultArray['color']['filterName'] = 'color';
                    }
                    if (empty( $resultArray['color']['items'][$chore['color']])) {
                        $resultArray['color']['items'][$chore['color']] = [
                            'amount' => 0,
                        ];
                    }
                    $resultArray['color']['items'][$chore['color']]['name'] = array_search($chore['color'], self::COLOR_MAP, true);
                    $resultArray['color']['items'][$chore['color']]['filterName'] = $chore['color'];
                    $resultArray['color']['items'][$chore['color']]['color'] = $chore['color'];

                    $resultArray['color']['amount']++;
                    $resultArray['color']['items'][$chore['color']]['amount']++;

                    $tmpColors[] = $chore['color'];
                } else {
                    $resultArray['color']['amount']++;
                    $resultArray['color']['items'][$chore['color']]['amount']++;
                }
                
            }

            if (!empty($chore['drawing'])) {
                if (empty($resultArray['drawings']['amount'])) {
                    $resultArray['drawings']['amount'] = 0;
                }
                $resultArray['drawings']['name'] = 'Drawings';
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

    public function deleteChores($ids) {
        $deleteCount = Chore::where('user_id', (int)$this->userId)
            ->whereIn('id', $ids)
            ->delete();

        return $deleteCount;    
    }


}