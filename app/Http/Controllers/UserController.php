<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;

use App\Models\User;
use App\Services\UserService;

use App\Http\Requests\User\UserEditRequest;

use Illuminate\Http\Request;


class UserController extends Controller
{

    public function update(UserEditRequest $request, UserService $userService) {
        $data = $request->all();

        return response()->json(
            $userService->update($data)
        );
    }

    public function syncTelegram(Request $request, UserService $userService)
    {
        $data = $request->all();
        return response()->json(
            $userService->syncTelegram($data['telegram_name'])
        );
    }
}