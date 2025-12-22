<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    // List users (paginated)
    public function index(Request $request)
    {
        $perPage = intval($request->per_page ?? $request->perPage ?? 12);
        $page = intval($request->page ?? 1);

        $query = User::orderBy('created_at', 'desc');

        if (!empty($request->search)) {
            $search = $request->search;
            $query = $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%$search%")
                  ->orWhere('email', 'like', "%$search%");
            });
        }

        $paginator = $query->paginate($perPage, ['*'], 'page', $page);

        return response()->json([
            'status' => 200,
            'data' => $paginator
        ], 200);
    }

    // Store new user
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:8',
            'role' => 'required|in:admin,customer'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors()
            ], 400);
        }

        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->role = $request->role;
        $user->password = $request->password; // will be hashed by model cast
        $user->save();

        return response()->json([
            'status' => 200,
            'message' => 'User created successfully',
            'data' => $user
        ], 200);
    }

    // Show single user
    public function show($id)
    {
        $user = User::find($id);

        if ($user == null) {
            return response()->json([
                'status' => 404,
                'message' => 'User not found',
                'data' => []
            ], 404);
        }

        return response()->json([
            'status' => 200,
            'data' => $user
        ], 200);
    }

    // Update user
    public function update($id, Request $request)
    {
        $user = User::find($id);

        if ($user == null) {
            return response()->json([
                'status' => 404,
                'message' => 'User not found',
                'data' => []
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email|unique:users,email,' . $id,
            'password' => 'nullable|min:8',
            'role' => 'required|in:admin,customer'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors()
            ], 400);
        }

        $user->name = $request->name;
        $user->email = $request->email;
        $user->role = $request->role;
        if (!empty($request->password)) {
            $user->password = $request->password; // will be hashed
        }
        $user->save();

        return response()->json([
            'status' => 200,
            'message' => 'User updated successfully',
            'data' => $user
        ], 200);
    }

    // Delete user
    public function destroy($id)
    {
        $user = User::find($id);

        if ($user == null) {
            return response()->json([
                'status' => 404,
                'message' => 'User not found',
                'data' => []
            ], 404);
        }

        $user->delete();

        return response()->json([
            'status' => 200,
            'message' => 'User deleted successfully'
        ], 200);
    }
}
