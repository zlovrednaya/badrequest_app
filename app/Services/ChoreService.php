<?php
namespace App\Services;

use Illuminate\Support\Facades\DB;

use App\Models\Chore;
use App\Models\User;

use App\Models\ChoreUserSetting;

use Illuminate\Support\Facades\Log;

class ChoreService 
{
    // [ human name=>DB_name]
    private const CATEGORY_MAP = [
        'color' => 'Color',
        'drawing' => 'Drawings',
        'category' => 'Category',
        'all' => 'All chores',
        'done' => 'Done',
    ];

    private const COLOR_MAP = [
        'White' => '#ffffff',
        'Rose' => '#ff99c8',
        'Yellow' => '#fff6df',
        'Pastel green' => '#d0f4de',
        'Blue' => '#a9def9',
        'Violet' => '#e4c1f9',
    ];

    private const CHORE_STRUCTURE = [
        [
            'type' => 'allchores',
            'name' => 'All chores',
            'filterName' => 'all',
        ],
        [
            'type' => 'done',
            'name' => 'Done',
            'filterName' => 'done',
            'filterType' => 'bool'
        ],
        [
            'type' => 'category',
            'name' => 'Category',
            'filterName' => 'category',
            'fillItems' => true,
        ], 
        [
            'type' => 'color',
            'name' => 'Color',
            'filterName' => 'color',
            'fillItems' => true,
            'parseVar' => self::COLOR_MAP,
        ], 
        [
            'type' => 'drawing',
            'name' => 'Drawings',
            'filterName' => 'drawing',
        ],
        
    ];

    private $user;

    public function __construct() {}

    protected function user(): User
    {
        $this->user = auth()->user();

        if (!$this->user) {
            throw new \RuntimeException('User is not authenticated.');
        }
        return $this->user;
    }

    public function add(array $data)
    {
        $data['user_id'] = $this->user()->id;

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
        $data['user_id'] = $this->user()->id;

        DB::beginTransaction();
        try {
            $chore = Chore::where(['id'=>$id])
                ->update($data);
            DB::commit();
            return $chore;
        } catch(\Exception $e) {
            DB::rollback();
            
            return [
                'success' => false,
                'error' => 'Unable to update item',
                'description' => $e->getMessage()
            ];
        }
    }

    public function getByIds($ids)
    {
        return Chore::where('user_id', (int)$this->user()->id)
            ->whereIn('id', $ids)
            ->orderBy('created_at', 'desc')
            ->get();
    }

    public function getAllForCalendar($filterData = []):array
    {
        $query = Chore::where('user_id', (int)$this->user()->id)
            ->whereNotNull('due_datetime')
            ->orderBy('created_at', 'desc')
            ->get()
            ->groupBy(function ($note) {
                return date('Y-m-d', strtotime($note->due_datetime));
            });

        return $query->toArray();           
    }

    public function getAll($filterData = []): array
    {
       $query = Chore::where('user_id', (int)$this->user()->id)
            ->orderBy('created_at', 'desc');

        if(!empty($filterData['column'])) {
            $column = $filterData['column'];
            if ($column != 'all') {
                if ($filterData['filterWord'] === 'all') {
                    $query->whereNotNull($column);
                } else {
                    $query->where($column, $filterData['filterWord']);
                }
            }
        }

        if(!empty($filterData['istodo'])) {
            $query->whereNull('drawing');
            $query->where('istodo', true);
            //$query->where('done', false);
        }

        if(!empty($filterData['done'])) {
            $query->where('done', $filterData['done']);
        }
       
         
        return $query->get()->toArray();    
    }

    public function fillChores(array &$resultArray, array &$tmpItems,  array $chore, array $structure)
    {
        if ($structure['type'] !== 'allchores' && empty($chore[$structure['type']])) return;
        if (empty($resultArray[$structure['type']])) {
            $resultArray[$structure['type']] = [];
            $resultArray[$structure['type']]['name'] = $structure['name'];
            if (!empty($structure['filterType'])) $resultArray[$structure['type']]['filterType'] = $structure['filterType'];
            if (!empty($structure['filterName'])) $resultArray[$structure['type']]['filterName'] = $structure['filterName'];
            $resultArray[$structure['type']]['amount'] = 1;
            if (!empty($structure['fillItems'])) $resultArray[$structure['type']]['items'] = [];
        } else {
            $resultArray[$structure['type']]['amount']++;
        }

        if (!empty($structure['fillItems'])) {
            if(empty($tmpItems[$structure['type']])) $tmpItems[$structure['type']] = [];
            if (!in_array($chore[$structure['type']], $tmpItems[$structure['type']])) {
                $resultArray[$structure['type']]['items'][$chore[$structure['type']]] = [
                    'name' => $chore[$structure['type']],
                    'filterName' => $chore[$structure['type']],
                    'amount' => 1,
                ];

                if (!empty($structure['parseVar'])) {
                    $resultArray[$structure['type']]['items'][$chore[$structure['type']]]['name'] = array_search($chore[$structure['type']], $structure['parseVar'], true);
                    $resultArray[$structure['type']]['items'][$chore[$structure['type']]]['filterName'] = $chore[$structure['type']];
                    $resultArray[$structure['type']]['items'][$chore[$structure['type']]][$structure['type']] = $chore[$structure['type']];
                } else {
                    $resultArray[$structure['type']]['items'][$chore[$structure['type']]]['name'] = $chore[$structure['type']];
                }

                $tmpItems[$structure['type']][] = $chore[$structure['type']];
            } else {
                
                $resultArray[$structure['type']]['items'][$chore[$structure['type']]]['amount']++;
            }
        }


    }

    // need to refactor
    public function getChoresStructure()
    {
        
        $resultArray = [];
        $chores = $this->getAll(); 

        if (empty($chores)) {
            return [];
        } 

        $tmpItems = [];
        $tmpCategories = [];
        $tmpColors = [];
        foreach($chores as $chore) {
            foreach(self::CHORE_STRUCTURE as $structure) {
                $this->fillChores($resultArray, $tmpItems, $chore, $structure);
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
        $deleteCount = Chore::whereIn('id', $ids)
            ->update(array('deleted' => true));

        return $deleteCount;    
    }  


    /**
     * Receive gained sum of done chores
     */
    public function getAmount() {
        $amount = Chore::selectRaw('
                SUM (CASE WHEN istodo = true THEN cost else 0 END) todo_amount,
                SUM (CASE WHEN istodo is not true THEN cost else 0 END) simplechores_amount,
                SUM (CASE WHEN istodo = true AND done = true THEN cost else 0 END) todo_done_amount,
                SUM (CASE WHEN istodo is not true AND done = true THEN cost else 0 END) simplechores_done_amount,
                SUM (CASE WHEN done = true THEN cost else 0 END) all_chores_done_amount
            ')
            ->first()->toArray();


        return [
            'amount' => $amount
        ];
    }

    /**
     * Updates chore mark it as done using telegram
     */
    public function updateChore(int $messageId) {
        Log::info('update message' . $messageId);
    }

    public function saveUserSettings(array $data) {
        return ChoreUserSetting::updateOrCreate(
            [
            'user_id' => $this->user()->id
            ], 
            [
            'settings' => json_encode($data['settings'])
            ]
        );
    }

}