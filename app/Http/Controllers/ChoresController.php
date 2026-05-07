<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use App\Http\Requests\Chore\ChoreBulkRequest;
use App\Http\Requests\Chore\ChoreEditRequest;

use App\Services\ChoreService;
use App\Services\NotificationService;

use App\Notifications\Messages\ChoreMessage;


class ChoresController extends Controller
{
    public function add(Request $request, ChoreService $choreService)
    {
        $data = $request->all();
        $response = $choreService->add($data);
    
        return response()->json($response);
    }

    public function update(ChoreEditRequest $request, ChoreService $choreService, int $id)
    {
        $data = $request->all();

        return response()->json(
            $choreService->update($id, $data)
        );
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

    public function shareChores(ChoreBulkRequest $request, ChoreService $choreService, NotificationService $notificationService) {
        $ids = $request->input('ids');

        $choresData = $choreService->getByIds($ids);
        $receiver = [
            'email' => $request->user()->email,
            'name'=> $request->user()->name,
        ];

        if(empty($choresData) || empty($receiver)) {
            return [
                'success' => false,
                'mesage' => 'We didn\'t find chores to share',
            ];
        }

        $message = new ChoreMessage();

        foreach($choresData as $chore) {
            $notificationService->sendMessage([
                'channel' => 'email',
                'receiver' => $receiver,
                'subject' => $chore['title'] || '[note] You have new note',
                'message' => $message->toText($chore)
            ]);
        }
        
        return [
            'success' => true,
            'message' => 'We\'ve sent an email',
        ];
    }
}