<?php
namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Hash;

class RegisterController extends Controller
{
    public function register(Request $request) {
        $userData = $request->validate([
            'email' => ['required', 'min:3', 'max:255'],
            'password' => ['required', 'min:8'],
        ]);
        $user = User::create([
            'email' => $userData['email'],
            'password' => Hash::make($userData['password']),
        ]);
        auth()->login($user);
        return redirect('/');
    }
}