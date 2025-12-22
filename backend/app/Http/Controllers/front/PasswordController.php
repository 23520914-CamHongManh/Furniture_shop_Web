<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class PasswordController extends Controller
{
    public function changePassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'current_password' => 'required',
            'new_password' => 'required|min:8|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors()
            ], 400);
        }

        $user = User::find($request->user()->id);

        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json([
                'status' => 400,
                'message' => 'Current password is incorrect.'
            ], 400);
        }

        $user->password = Hash::make($request->new_password);
        $user->save();

        return response()->json([
            'status' => 200,
            'message' => 'Password changed successfully.'
        ], 200);
    }
}
