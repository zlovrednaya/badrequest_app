<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\ChoreService;
use Illuminate\Support\Facades\Auth;

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
        return response()->json(
            $choreService->getAll($request->user()->id)
        );
    }

    public function getChoresStructure(Request $request, ChoreService $choreService)
    {
        return response()->json(
            $choreService->getChoresStructure($request->user()->id)
        );
    }
}