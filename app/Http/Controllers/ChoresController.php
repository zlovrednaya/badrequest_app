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
    public function __construct(private ChoreService $choreService)
    {
    }

    public function add(Request $request)
    {
        $data = $request->all();
        $response = $this->choreService->add($data);
    
        return response()->json($response);
    }

    public function update(ChoreEditRequest $request, int $id)
    {
        $data = $request->all();

        return response()->json(
            $this->choreService->update($id, $data)
        );
    }

    public function getList(Request $request)
    {
        $filterData = $request->all();

        return response()->json(
            $this->choreService->getAll($filterData)
        );
    }

    public function getChoresStructure(Request $request)
    {
        return response()->json(
            $this->choreService->getChoresStructure()
        );
    }

    public function filterChores(Request $request) {
        $filterData = $request->all();

        return response()->json(
            $this->choreService->filterChores($filterData)
        );
    }

    public function deleteChores(ChoreBulkRequest $request) 
    {
        $data = $request->input('ids');

        $count = $this->choreService->deleteChores($data);

        return response()->json([
            'success' => $count > 0,
            'message' => 'We deleted ' . $count . ' chore/s',
        ]);
    }

    public function shareChores(ChoreBulkRequest $request, NotificationService $notificationService) 
    {
        $ids = $request->input('ids');

        $choresData = $this->choreService->getByIds($ids);
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

    public function shareTelegramChores(ChoreBulkRequest $request, NotificationService $notificationService)
    {
        $ids = $request->input('ids');

        $choresData = $this->choreService->getByIds($ids);
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
        foreach($choresData as $chore) {
            $notificationService->getUpdates([
                    'channel' => 'telegram',
                    'receiver' => $receiver,
                    'subject' => $chore['title'] || '[note] You have new note',
                    'message' => 'text tst',
            ]);
        }
    }

    public function getAmount(Request $request){
        return response()->json(
            $this->choreService->getAmount()
        );
    }
}