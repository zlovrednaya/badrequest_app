<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;

class RegisterController extends Controller
{
    public function postRegister(Request $request) {
        try {
            
            $userData = $request->validate([
                'name' => ['required', 'unique:users', 'min:3', 'max:255'],
                'email' => ['required', 'unique:users', 'regex:/^.+@.+$/i'],
                'password' => ['required', 'min:8'],
            ]);
            $user = User::create([
                'name' => $userData['name'],
                'email' => $userData['email'],
                'password' => Hash::make($userData['password']),
            ]);
            auth()->login($user);

            return redirect('/');
        } catch (Throwable $error) {
            //echo print_r($error);
            return ['data'=>true];
        }
    }
}