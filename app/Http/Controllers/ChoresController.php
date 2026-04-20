<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\ChoreService;
use Illuminate\Support\Facades\Auth;

class ChoresController extends Controller
{
    public function add(Request $request, ChoreService $choreService) {
        $data = $request->all();
        $response = $choreService->add($data);
        
        return response()->json($response);
    }
}