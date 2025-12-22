<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Carbon\Carbon;

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

    // Send reset link to email (public)
    public function sendResetLinkEmail(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors()
            ], 400);
        }

        $email = $request->email;
        $user = User::where('email', $email)->first();

        if (!$user) {
            // don't reveal whether email exists
            return response()->json([
                'status' => 200,
                'message' => 'If that email exists in our system, we have sent a password reset link.'
            ], 200);
        }

        $plainToken = Str::random(64);
        $hashedToken = Hash::make($plainToken);

        DB::table('password_reset_tokens')->updateOrInsert(
            ['email' => $email],
            ['token' => $hashedToken, 'created_at' => Carbon::now()]
        );

        // Build reset link. Use admin reset path for admins, else user path.
        $path = $user->role === 'admin' ? '/admin/reset-password' : '/account/reset-password';
        $link = config('app.url') . $path . '?token=' . $plainToken . '&email=' . urlencode($email);

        // Try to send email (best effort), also log link for local development
        try {
            Mail::raw("Use this link to reset your password: $link", function ($message) use ($email) {
                $message->to($email)->subject('Password Reset Request');
            });
        } catch (\Exception $e) {
            Log::warning('Failed to send password reset email: ' . $e->getMessage());
        }

        Log::info("Password reset link for $email: $link");

        return response()->json([
            'status' => 200,
            'message' => 'If that email exists in our system, we have sent a password reset link.'
        ], 200);
    }

    // Reset password using token (public)
    public function resetPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'token' => 'required',
            'new_password' => 'required|min:8|confirmed'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors()
            ], 400);
        }

        $record = DB::table('password_reset_tokens')->where('email', $request->email)->first();

        if (!$record) {
            return response()->json([
                'status' => 400,
                'message' => 'Invalid or expired token.'
            ], 400);
        }

        // Token expiry: 60 minutes
        $created = Carbon::parse($record->created_at);
        if (Carbon::now()->diffInMinutes($created) > 60) {
            DB::table('password_reset_tokens')->where('email', $request->email)->delete();
            return response()->json([
                'status' => 400,
                'message' => 'Token has expired.'
            ], 400);
        }

        if (!Hash::check($request->token, $record->token)) {
            return response()->json([
                'status' => 400,
                'message' => 'Invalid token.'
            ], 400);
        }

        $user = User::where('email', $request->email)->first();
        if (!$user) {
            return response()->json([
                'status' => 400,
                'message' => 'User not found.'
            ], 400);
        }

        $user->password = Hash::make($request->new_password);
        $user->save();

        DB::table('password_reset_tokens')->where('email', $request->email)->delete();

        return response()->json([
            'status' => 200,
            'message' => 'Password has been reset successfully.'
        ], 200);
    }
}
