<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use App\Http\Requests\Chore\ChoreBulkRequest;
use App\Services\ChoreService;


class ChoresController extends Controller
{
    public function add(Request $request, ChoreService $choreService)
    {
        $data = $request->all();
        $response = $choreService->add($data);
    
        return response()->json($response);
    }

    public function getList(Request $request, ChoreService $choreService)
    {
        $filterData = $request->all();

        return response()->json(
            $choreService->getAll($filterData)
        );
    }

    public function getChoresStructure(Request $request, ChoreService $choreService)
    {
        return response()->json(
            $choreService->getChoresStructure()
        );
    }

    public function filterChores(Request $request, ChoreService $choreService) {
        $filterData = $request->all();

        return response()->json(
            $choreService->filterChores($filterData)
        );
    }

    public function deleteChores(ChoreBulkRequest $request, ChoreService $choreService) {
        $data = $request->input('ids');

        $count = $choreService->deleteChores($data);

        return response()->json([
            'success' => $count > 0,
            'message' => 'We deleted ' . $count . ' chore/s',
        ]);
    }
}