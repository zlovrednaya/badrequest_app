<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

use App\Http\Requests\Chore\ChoreBulkRequest;
use App\Http\Requests\Chore\ChoreEditRequest;

use App\Services\ChoreService;
use App\Services\NotificationService;
use App\Services\UserService;
use App\Services\Integrations\Telegram\TelegramUpdateService;

use App\Notifications\Messages\ChoreMessage;
use App\Models\User;


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

    public function shareTelegramChores(ChoreBulkRequest $request, UserService $userService, NotificationService $notificationService, User $user, TelegramUpdateService $telegramUpdate)
    {
        $ids = $request->input('ids');
        $choresData = $this->choreService->getByIds($ids)->toArray();
        $receiver = [
            'channel' => 'telegram',
            'email' => $request->user()->email,
            'name'=> $request->user()->name,
        ];
        $receiver = $userService->getReceiver(
            $user, 
            $receiver
        );

        if(empty($receiver)) {
            return [
                'success' => false,
                'error' => 'Unable to get receiver',
            ];
        }
        if(empty($choresData) || empty($receiver)) {
            return [
                'success' => false,
                'message' => 'We didn\'t find chores to share',
            ];
        }

        foreach($choresData as $chore) {
            $createdMessage = $notificationService->sendMessage([
                    'channel' => 'telegram',
                    'receiver' => $receiver,
                    'subject' => $chore['title'] || '[note] You have a new note',
                    'message' => '<b>' . $chore['title']. '</b>'. $chore['text'],
            ]);
            Log::info('received message');
            Log::info($createdMessage);
            $telegramUpdate->createTelegramMessage($createdMessage, $chore);
        }
        return [
            'success' => true,
        ];
    }

    public function getAmount(Request $request){
        return response()->json(
            $this->choreService->getAmount()
        );
    }

    public function getAllForCalendar(Request $request){
        return response()->json(
            $this->choreService->getAllForCalendar()
        );
    }

    public function saveUserSettings(Request $request){
        try {
            $this->choreService->saveUserSettings(
                $request->all()
            );

            return response()->json([
                'success' => true,
                'message' => 'Settings saved',
            ], 200);
        } catch(\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to save settings',
            ], 200);
        }
    }

    public function getUserSettings() {
        return response()->json(
            $this->choreService->getUserSettings()
        );
    }

    public function getById(int $id) {
        return response()->json(
            $this->choreService->getById($id)
        );
    }
}